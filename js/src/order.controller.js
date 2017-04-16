/**
 * Created by Amit on 11/21/2016.
 */
(function () {
    "use strict";

    var dateTimeHelper = require("./dateTimeHelper");
    var utility = require("./utility");
    var dataManager = require("./data.manager");
    var notPickedupYetStatus = [
        "NOT_ASSIGNED",
        "NOT_ACCEPTED",
        "NOT_STARTED_YET",
        "STARTED"
    ];
    var ALL_STATUSES = [];
    ALL_STATUSES[0] = 'NOT_ASSIGNED';
    ALL_STATUSES[1] = 'NOT_ACCEPTED';
    ALL_STATUSES[2] = 'NOT_STARTED_YET';
    ALL_STATUSES[3] = 'STARTED';
    ALL_STATUSES[4] = 'PICKED_UP';
    ALL_STATUSES[5] = 'READY_TO_DELIVER';
    ALL_STATUSES[6] = 'ALREADY_DELIVERED';

    function adaptActiveOrderView(activeOrderInfo) {
        var tableDataSet = [];
        $.each(activeOrderInfo, function (key, value) {
            var browserPlacementTime, elapsedTime, browserEstimatedDeliveryTime;
            var status = adaptOrderStatusData(value.orderStatus);


            var alert = getAlertOrder(value);


            if ((alert === "PICKUP_ALERT") && (value.orderStatus !== "NOT_ASSIGNED")) {
                status = "<span class='text-color-orange' >" + status + "</span>";
            }

            else if ((alert === "DELIVERY_ALERT") && (value.orderStatus !== "NOT_ASSIGNED")) {
                status = "<span class='text-color-brick-red'>" + status + "</span>";
            }

            else if (value.orderStatus === "NOT_ASSIGNED")
                status = "<div class='set_middle'><a href='javascript:void(0)' class='btn btn-questtag btn-sm small-text3' style='display: block' title='Assign Order' data-task='assignment' data-refid='" + value.id + "'>" + status + "</a></div>";

            browserPlacementTime = dateTimeHelper.getTimeFromDateTime(
                dateTimeHelper.convertToBrowsersDateTime(value.orderDateTimeInfo.placementTime));

            elapsedTime = dateTimeHelper.convertMilisecondsToMinutes(
                dateTimeHelper.getElapsedTime(value.orderDateTimeInfo.placementTime)
            );

            var browserEstimatedDeliveryDateTime =
                dateTimeHelper.convertToBrowsersDateTime(value.orderDateTimeInfo.expectedDeliveryDate + ' ' +
                    value.orderDateTimeInfo.expectedDeliveryTime);

            browserEstimatedDeliveryTime = dateTimeHelper.getTimeFromDateTime(browserEstimatedDeliveryDateTime);

            var distanceToPickUp = parseFloat(value.distanceBetweenPickUpAndDeliveryLocation).toFixed(2);
            var distanceUnit = getDistanceUnit(distanceToPickUp);
            var timeUnit = getTimeUnit(elapsedTime);
            var totalAmount = adaptOrderTotalAmount(value.costInfo.totalCost);
            var iconAndOrder;
            if (value.scheduled) {
                iconAndOrder = '<span><i class="fa fa-clock-o" aria-hidden="true"></i>' + ' ' + value.orderNumber + '</span>';
            }
            else if (value.parentId > 0) {
                iconAndOrder = '<span><img width="14" height="14" alt="" src="/imgs/redrop.png">' + ' ' + value.orderNumber + '</span>';

            }
            else {
                iconAndOrder = value.orderNumber;
            }


            var temp = [
                iconAndOrder,
                value.customer.name,
                // value.customer.emailAddress,
                value.restaurant.name,
                totalAmount,
                distanceToPickUp + ' ' + distanceUnit,
                browserPlacementTime,
                browserEstimatedDeliveryTime,
                elapsedTime + ' ' + timeUnit,
                getCarrierName(value.assignedCarrier),
                status,
                getViewButton(value.id)
            ];
            tableDataSet.push(temp);
        });
        return tableDataSet;

    }

    function alertOrder(order) {
        if ($.inArray(order.orderStatus, notPickedupYetStatus) !== -1) {
            //not yet picked up
            //console.log("not picked up yet");
            if (
                dateTimeHelper.pickupTimeOk(
                    order.orderDateTimeInfo.expectedDeliveryDate,
                    order.orderDateTimeInfo.expectedPickUpTime
                ) === false
            ) {
                return "PICKUP_ALERT";
            }
        }
        if (order.orderStatus === "PICKED_UP") {
            //console.log("picked up");
            if (
                dateTimeHelper.deliveryTimeOk(
                    order.orderDateTimeInfo.expectedDeliveryDate,
                    order.orderDateTimeInfo.expectedDeliveryTime
                ) === false) {
                return "DELIVERY_ALERT";
            }
        }
        return false;
    }


    function showOrderDetails(orderId) {
        $('#orderDetailsView').modal('show');
        var data = dataManager.getOrderDetailsData();
        var orderDetailsData = OrderDetailsAdaptation(data);
        $("#orderDetailsView .main-content").putTemplate("#template-order-detail", orderDetailsData);
        $("#orderDetailsView .show-before-loading").hide();
        $("#orderDetailsView .show-after-loading").show();


        if (orderDetailsData.orderStatus !== "ALREADY_DELIVERED") {
            $('#orderDetailsView .deleteButton').attr('data-delete', orderDetailsData.order_id);
            $('#orderDetailsView .deleteButton').show();

            $('#orderDetailsView .forceOrderComplete').show();

        } else {
            $('#orderDetailsView .deleteButton').hide();
            $('#orderDetailsView .forceOrderComplete').hide();
        }
    }

    function OrderDetailsAdaptation(input) {
        var orderData = input.orders[0];
        if (orderData.signature_path) {
            var sigPath = orderData.signature_path.split('//');
            orderData.signature_path = 'http://' + sigPath[1];
        }
        return orderData;
    }

    function adaptFutureOrderView(activeOrderInfo) {
        var tableDataSet = [];
        $.each(activeOrderInfo, function (key, value) {
            var browserPlacementTime, elapsedTime, browserEstimatedDeliveryTime;
            var status = adaptOrderStatusData(value.orderStatus);


            var alert = getAlertOrder(value);


            if ((alert === "PICKUP_ALERT") && (value.orderStatus !== "NOT_ASSIGNED")) {
                status = "<span class='text-color-orange' >" + status + "</span>";

            }

            else if ((alert === "DELIVERY_ALERT") && (value.orderStatus !== "NOT_ASSIGNED")) {
                status = "<span class='text-color-brick-red'>" + status + "</span>";
            }

            else if (value.orderStatus === "NOT_ASSIGNED")
                status = "<div class='set_middle'><a href='javascript:void(0)' class='btn btn-questtag btn-sm small-text3' style='display: block' title='Assign Order' data-task='assignment' data-refid='" + value.id + "'>" + status + "</a></div>";

            browserPlacementTime = dateTimeHelper.getTimeFromDateTime(
                dateTimeHelper.convertToBrowsersDateTime(value.orderDateTimeInfo.placementTime));

            elapsedTime = dateTimeHelper.convertMilisecondsToMinutes(
                dateTimeHelper.getElapsedTime(value.orderDateTimeInfo.placementTime)
            );

            var browserEstimatedDeliveryDateTime =
                dateTimeHelper.convertToBrowsersDateTime(value.orderDateTimeInfo.expectedDeliveryDate + ' ' +
                    value.orderDateTimeInfo.expectedDeliveryTime);

            browserEstimatedDeliveryTime = dateTimeHelper.getTimeFromDateTime(browserEstimatedDeliveryDateTime);

            var distanceToPickUp = parseFloat(value.distanceBetweenPickUpAndDeliveryLocation).toFixed(2);
            var distanceUnit = getDistanceUnit(distanceToPickUp);
            var timeUnit = getTimeUnit(elapsedTime);
            var totalAmount = adaptOrderTotalAmount(value.costInfo.totalCost);
            var iconAndOrder;
            if (value.scheduled) {
                iconAndOrder = '<span><i class="fa fa-clock-o" aria-hidden="true"></i>' + ' ' + value.orderNumber + '</span>';
            }
            else if (value.parentId > 0) {
                iconAndOrder = '<span><img width="14" height="14" alt="" src="/imgs/redrop.png">' + ' ' + value.orderNumber + '</span>';

            }
            else {
                iconAndOrder = value.orderNumber;
            }


            var temp = [
                iconAndOrder,
                value.customer.name,
                // value.customer.emailAddress,
                value.restaurant.name,
                totalAmount,
                distanceToPickUp + ' ' + distanceUnit,
                browserPlacementTime,
                browserEstimatedDeliveryTime,
                elapsedTime + ' ' + timeUnit,
                getCarrierName(value.assignedCarrier),
                status,
                getViewButton(value.id)
            ];
            tableDataSet.push(temp);
        });
        return tableDataSet;

    }

    function getCarrierName(carrierObj) {
        if (carrierObj === null) {
            return "<p style='text-align:center' >_ _</p>";
        }
        return utility.lastNameOneCharacter(carrierObj.name);

    }

    function lastNameOneCharacter(fullName) {

        var toReturn = "";
        var names = fullName.split(" ");
        if (names.length > 1) {
            toReturn += names[0] + " ";
            toReturn += names[names.length - 1].substring(0, 1) + ".";
        } else {
            toReturn = fullName;
        }
        return toReturn;
    }


    function getTimeUnit(time) {
        var unit;
        if (time <= 1) {
            unit = 'min.';
        } else {
            unit = '';
        }
        return unit;
    }

    function adaptOrderFeedbackData(feedback) {
        var adaptedFeedback;
        if (feedback === 'null') {
            adaptedFeedback = 'N/A';
        } else {
            if (feedback < 0) {
                adaptedFeedback = 'Not good';
            } else if (feedback === 0) {
                adaptedFeedback = 'Good';
            } else {
                adaptedFeedback = 'Excellent';
            }
        }
        return adaptedFeedback;
    }

    function adaptOrderTotalAmount(totalCost) {
        return adaptOrderCostInput(totalCost);
    }

    function adaptOrderDiscount(discount) {
        return adaptOrderCostInput(discount);
    }

    function adaptOrderDeliveryFee(deliveryFee) {
        return adaptOrderCostInput(deliveryFee);
    }

    function adaptOrderDeliverTip(deliveryTip) {
        return adaptOrderCostInput(deliveryTip);
    }

    function adaptOrderCostInput(input) {
        if (input < 0) {
            return 'N/A';
        } else {
            input = parseFloat(input).toFixed(2);
            return '$' + '' + input;
        }
    }


    function getViewButton(id) {
        var viewButton = '<div class="set_middle"><a href="javascript:void(0)" class="btn btn-questtag btn-sm small-text3" style="display: block" data-task="viewOrder" data-orderId="' + id + '">View</a></div>';
        return viewButton;
    }

    function getViewRedoButton(id, orderNo) {
        var viewRedoButton = '<div class="row" style="margin-left: 0px;margin-right: 0px;" ><a type="button" data-task="viewOrder" data-orderId="' + id + '" class="btn btn-questtag btn-sm small-text3" href="javascript:void(0)" style="width:70%;"  >View</a><a href="javascript:void(0)" class="btn btn-questtag btn-sm small-text3" data-task="redropOrder" data-orderId="' + id + '" data-orderNo="' + orderNo + '" style="margin-left:5%;margin-right:0px;width: 25%;" ><i class="fa fa-undo" aria-hidden="true" ></i></a></div>';
        return viewRedoButton;
    }

    function getDistanceUnit(distance) {
        var unit;
        if (distance <= 1) {
            unit = 'mile';
        } else {
            unit = 'miles';
        }
        return unit;
    }


    function getAlertOrder(order) {
        if ($.inArray(order.orderStatus, notPickedupYetStatus) !== -1) {
            //not yet picked up
            //console.log("not picked up yet");
            if (
                dateTimeHelper.pickupTimeOk(
                    order.orderDateTimeInfo.expectedDeliveryDate,
                    order.orderDateTimeInfo.expectedPickUpTime
                ) === false
            ) {
                return "PICKUP_ALERT";
            }
        }
        if (order.orderStatus === "PICKED_UP") {
            //console.log("picked up");
            if (
                dateTimeHelper.deliveryTimeOk(
                    order.orderDateTimeInfo.expectedDeliveryDate,
                    order.orderDateTimeInfo.expectedDeliveryTime
                ) === false) {
                return "DELIVERY_ALERT";
            }
        }
        return false;
    }

    function adaptOrderStatusData(orderStatus) {
        var status = null;
        switch (orderStatus) {
            case 'NOT_ASSIGNED':
                status = 'Unassigned';
                break;
            case 'NOT_ACCEPTED':
                status = 'Waiting';
                break;
            case 'NOT_STARTED_YET':
                status = 'Not started';
                break;
            case 'STARTED':
                status = 'Started';
                break;
            case 'PICKED_UP':
                status = 'Picked Up';
                break;
            case 'READY_TO_DELIVER':
                status = 'At the Door';
                break;
            case 'ALREADY_DELIVERED':
                status = 'Delivered';
                break;
            case 'INCOMPLETE':
                status = 'Incomplete';
                break;
        }
        return status;
    }


    function getStatusStage(status) {
        return $.inArray(status, ALL_STATUSES);
    }

    function isAfterPickedUp(status) {
        if ($.inArray(status, notPickedupYetStatus) !== -1) {
            return false;
        }
        else {
            return true;
        }
    }

    function getOrderItemLine() {
        var lastRowNum = $('#newOrderForm [data-order-item]').last().attr("data-order-item");
        if (lastRowNum === undefined) {
            lastRowNum = 0;
        }
        var nextRowNo = Number(lastRowNum) + 1;
        var htmlSrc = $("#template-order-item-row").templateify({number: nextRowNo});
        return htmlSrc;
    }

    function appendNewRowInItemInModal(htmlSrc) {
        $("#new-order-items").append(htmlSrc);
    }

    function putNewRowInItemInModal() {
        var htmlSrc = getOrderItemLine();
        appendNewRowInItemInModal(htmlSrc);
    }

    function newOrderFormSerializeItems() {
        var items = [];

        var aItem = {
            name: $("[name='item[][name]']").val(),
            quantity: 1,
            unitPrice: $("[name='item[][unit-price]']").val(),
        };

        if (aItem.name === "" && aItem.quantity === "" && aItem.unitPrice === "") {

        } else {
            items.push(aItem);
        }


        return items;
    }

    function showActiveOrderTable(activeOrderInfo) {
        var tableData = adaptActiveOrderView(activeOrderInfo);
        $('#table-active-order').DataTable({
            data: tableData,
            "paging": false,
            "ordering": false,
            "info": false,
            "searching": false

        });
    }

    function showFutureOrderTable(activeOrderInfo) {
        var tableData = adaptFutureOrderView(activeOrderInfo);
        $('#table-scheduled-order').DataTable({
            data: tableData,
            "paging": false,
            "ordering": false,
            "info": false,
            "searching": false,
            destroy: true

        });
    }

    $(document).ready(function () {
        $(document).on('click', "[data-task='assignment']", function () {
            var refId = $(this).attr('data-refId');
            var alreadyAssigned = $(this).data("assigned");
            $('#assign_order').modal('show');
            //assignmentModal.ShowModal(refId, alreadyAssigned);

        });


        $(document).on('click', '[data-task="unassign-order"]', function () {
            var orderId = $(this).data('orderId');
            //OrderAssignee.unassignOrder(orderId);
        });

        $(document).on('click', '[data-task="carrier-end-shift"]', function () {
            var carrierId = $(this).attr('data-refId');
            //dboard.endCarrierShift(carrierId, $(this));
        });


        $(document).on('click', '[data-task="unassign-order-not-accepted"]', function () {
            //HandleEvent.unassignCarrier(this);
        });


        $(document).on('click', '#addNewItemRow', function (e) {
            e.preventDefault();
            putNewRowInItemInModal();
        });


        $(document).on('click', "[data-toggle='delete-element']", function () {
            var elemetntToDelete = $(this).attr('data-select');
            $(elemetntToDelete).remove();
        });
        $(document).on('focus', "#myModal_new_order [data-order-item]:last", function () {

            putNewRowInItemInModal();
        });

        $(document).on('click', "[data-task='viewOrder']", function () {
            var orderId = $(this).attr('data-orderId');

            showOrderDetails(orderId);
        });
    });


    exports.getStatusStage = getStatusStage;
    exports.isAfterPickedUp = isAfterPickedUp;
    exports.generateActiveOrderTable = showActiveOrderTable;
    exports.generateFutureOrderTable = showFutureOrderTable;
    exports.alertOrder = alertOrder;
    exports.adaptOrderStatusData = adaptOrderStatusData;

}());

