/**
 * Created by kawnayeen on 10/19/16.
 */
(function () {
    "use strict";

    var utility = require("./utility");
    var dateTimeHelper = require("./dateTimeHelper");
    var processImageAndName = require("./processImageAndName");
    var orderViewGenerator = require("./order.controller");

    function adaptingDashboardDriverData(input) {
        var returnData = [];
        $.each(input, function (key, val) {
            returnData.push({
                driverId: val.id,
                driverName: val.name,
                orderNo: val.numberOfAssignedOrders,
                raw: val
            });
        });
        return returnData;
    }

    function adaptingDashboardOrderData(carriers) {
        var returnOrderData = [];
        $.each(carriers, function (key, carrier) {
            $.each(carrier.assignedOrders, function (keyOrder, orders) {
                returnOrderData.push(
                    adaptingEachOrderCommon(orders)
                );
            });
        });
        console.log("returning orderdata" + returnOrderData);
        return returnOrderData;
    }

    function adaptingEachOrderCommon(val) {

        var placementTime = dateTimeHelper.convertToBrowsersDateTime(val.orderDateTimeInfo.placementTime);
        var formatedTime = dateTimeHelper.formatTimeInDashbord(placementTime);

        var notAcceptedCarriers = formatCarriers(val.previouslyAssignedCarriers);

        var driverId = val.assignedCarrier === null ? null : val.assignedCarrier.id;
        var afterPickedUp = orderViewGenerator.isAfterPickedUp(val.orderStatus);
        var cashTip = val.costInfo.cashTip;
        return {
            driverId: driverId,
            orderId: val.id,
            orderNumber: val.orderNumber,
            time: placementTime,
            formatedTime: formatedTime,
            fromName: val.restaurant.name,
            fromAddress: stripAddress(val.restaurant.address),
            toName: val.customer.name,
            toAddress: stripAddress(val.customer.address),
            rejectedCarriers: notAcceptedCarriers.rejectedCarriers,
            noResponseCarriers: notAcceptedCarriers.noResponseCarriers,
            carrier_name: val.assignedCarrier,
            totalCost: val.costInfo.totalCost === -1 ? "N/A" : val.costInfo.totalCost,
            totalTip: val.costInfo.predefinedTip === -1 ? "N/A" : val.costInfo.predefinedTip + cashTip,
            alert: orderViewGenerator.alertOrder(val),
            accepted: val.accepted,
            status: val.orderStatus,
            prettyStatus: orderViewGenerator.adaptOrderStatusData(val.orderStatus),
            autoAssignmentStatus: val.autoAssignmentStatus,
            afterPickedUp: afterPickedUp,
            scheduled: val.scheduled,
            parentId: val.parentId
        };
    }


    function stripAddress(address) {
        var newAddress = "";
        var list = address.split(",");

        if (list.length < 3) {
            return address;
        }
        for (var i = 0; i < list.length - 2; i++) {
            newAddress += list[i] + ",";
        }
        newAddress = newAddress.substr(0, newAddress.length - 1);
        return newAddress;
    }

    function adaptDriverPaymentView(carrierInfos) {
        var tableDataSet = [];
        var offDutyDataSet = [];
        $.each(carrierInfos, function (key, value) {
            var status, name, phone, completedDeliveries, deliveryFees, onlineTips, earnings, adjustments, paymentDue;

            var style = '';
            var classUi = '';
            name = value.name;
            var driverImage;

            var adjustmentInput = "<div style='padding-left: 20%'><input type='number' id='adjustmentInput' carrierId='" + value.carrierId + "'  value='" + value.existingAdjustment + "' prevAdjust='" + value.existingAdjustment + "'  style='width:100px;'> </div>";
            driverImage = '';

            var driverImageAndName = "<a href='javascript:void(0)' class='" + classUi + "' data-toggle='driver-profile' data-driver-id='" + value.id + "'>" + driverImage + name + "</a>";
            if (value.onDuty) {
                phone = "<a href='tel:" + utility.correctPhoneFormat(value.phoneNumber) + "'>" + utility.correctPhoneFormat(value.phoneNumber) + "</a>";
                completedDeliveries = value.completedDeliveries;


                deliveryFees = utility.adaptOrderCostInput(value.deliveryFees);
                onlineTips = utility.adaptOrderCostInput(value.onlineTips);
                earnings = utility.adaptOrderCostInput(value.tipsAnddeliveryFees);
                adjustments = adjustmentInput;
                paymentDue = (value.totalEarning);
            }
            else {
                phone = "<a href='tel:" + utility.correctPhoneFormat(value.phoneNumber) + "'>" + wrapInactiveDriverStyle(utility.correctPhoneFormat(value.phoneNumber)) + "</a>";
                completedDeliveries = value.completedDeliveries;
                deliveryFees = wrapInactiveDriverStyle(utility.adaptOrderCostInput(value.deliveryFees));
                onlineTips = wrapInactiveDriverStyle(utility.adaptOrderCostInput(value.onlineTips));
                earnings = wrapInactiveDriverStyle(utility.adaptOrderCostInput(value.tipsAnddeliveryFees));
                adjustments = adjustmentInput;
                paymentDue = wrapInactiveDriverStyle(utility.adaptOrderCostInput(value.totalEarning));

            }
            var temp = [driverImageAndName, phone, completedDeliveries, deliveryFees, onlineTips, earnings, adjustments, paymentDue];

            if (value.onDuty) tableDataSet.push(temp); else offDutyDataSet.push(temp);
        });
        return tableDataSet.concat(offDutyDataSet);
    }

    function formatCarriers(previouslyAssignedCarriers) {
        var noResponse = [];
        var rejected = [];
        $.each(previouslyAssignedCarriers, function (keyRejectedCarrier, previouslyAssignedCarrier) {
            if (previouslyAssignedCarrier.cause === "TIMED_OUT") {
                if ($.inArray(previouslyAssignedCarrier.name, noResponse) === -1) {
                    noResponse.push(previouslyAssignedCarrier.name);
                }
            } else {
                if ($.inArray(previouslyAssignedCarrier.name, rejected) === -1) {
                    rejected.push(previouslyAssignedCarrier.name);
                }
            }
        });
        return {
            noResponseCarriers: noResponse,
            rejectedCarriers: rejected
        };
    }


    function adaptDriverView(carrierInfos) {

        var tableDataSet = [];
        var offDutyDataSet = [];

        $.each(carrierInfos, function (key, value) {
            var driverID, status, vehicle, phone, endShiftButton, email;
            var driverImageAndName = generateDriverNameAndImage(value);
            var personalId = getPersonalId(value);

            if (value.status) {
                driverID = personalId;
                email = value.email;
                status = 'On Duty';
                vehicle = "<span>" + getVehicle(value.vehicle.type) + "</span>";
                phone = value.phoneNumber;
                endShiftButton = generateEndShiftForActiveDriver(value);

            }
            else {

                driverID = wrapInactiveDriverStyle(personalId);
                email = wrapInactiveDriverStyle(value.email);
                status = wrapInactiveDriverStyle('Off Duty');
                vehicle = wrapInactiveDriverStyle(getVehicle(value.vehicle.type));
                phone = "<a href='tel:" + value.phoneNumber + "</a>";
                endShiftButton = generateEndShiftForOffDutyDriver(value);

            }

            var temp = [driverImageAndName, phone, email, driverID, vehicle, status, endShiftButton];

            if (value.status) tableDataSet.push(temp); else offDutyDataSet.push(temp);
        });

        return tableDataSet.concat(offDutyDataSet);
    }

    function wrapInactiveDriverStyle(val) {
        return "<span style='color: #9da3b3'>" + val + "</span>";
    }

    function generateDriverNameAndImage(driver) {
        return "<a href='javascript:void(0)' " +
            "class='' " +
            "data-toggle='driver-profile' " +
            "data-driver-id='" + driver.id + "'>" +
            driver.name + "</a>";
    }


    function getPersonalId(driver) {
        return !driver.personalId ? 'N/A' : driver.personalId;
    }

    function generateEndShiftForActiveDriver(driver) {
        return "<a href='javascript:void(0)' " +
            "class='btn btn-sm btn-questtag btn-block small-text-special' " +
            "data-task='carrier-end-shift' " +
            "data-refid='" + driver.shiftId + "'>End shift</a>";
    }

    function generateEndShiftForOffDutyDriver(driver) {
        return "<a href='javascript:void(0)'" +
            "class='btn btn-sm btn-questtag btn-block small-text-special'" +
            " data-task='carrier-end-shift'" +
            " data-refid='" + driver.shiftId + "'" +
            " disabled>End shift </a>";
    }

    function getVehicle(vehicleType) {
        var first = '<span class="fa ';
        var last = '"></span>';
        if (vehicleType === 'CAR')
            return first + 'fa-car' + last;
        if (vehicleType === 'BICYCLE')
            return first + 'fa-bicycle' + last;
        if (vehicleType === 'MOTORCYCLE')
            return first + 'fa-motorcycle' + last;
        if (vehicleType === 'MOTORBIKE')
            return first + 'fa-motorcycle' + last;
    }

    function showDrivers(driverInfo) {
        var tableData = adaptDriverView(driverInfo);
        $('#table_id_carrier').DataTable({

            "bFilter": false,
            paging: false,
            "info": false,
            "order": [[5, "desc"]],
            data: tableData,
            "aoColumns": [
                {"bSortable": false, "className": 'nowrap'},
                {"bSortable": false},
                {"bSortable": false},
                {"bSortable": false},
                {"bSortable": false},
                {"bSortable": false},
                {"bSortable": false}
            ]

        });

    }


    function showDriverPayment(driverInfo) {
        var tableData = adaptDriverPaymentView(driverInfo);

        $('#table_driver_payment').DataTable({

            "bFilter": false,
            paging: false,
            "order": [[7, "desc"]],
            "info": false,
            data: tableData,
            "aoColumns": [
                {"bSortable": false, "className": 'nowrap'},
                {"bSortable": false},
                {"bSortable": false, "className": "text-center"},
                {"bSortable": false},
                {"bSortable": false},
                {"bSortable": false},
                {"bSortable": false},
                {"bSortable": false}
            ]


        });

    }

    function adaptDriverImageData(driverInfo) {
        var imagePath = null;
        var driverImage;
        if (driverInfo.thumbnailImagePath !== null) {
            imagePath = driverInfo.thumbnailImagePath;
        } else if (driverInfo.imagePath !== null) {
            imagePath = driverInfo.imagePath;
        } else {
            imagePath = null;
        }

        if (imagePath === null) {
            driverImage = $('#template-avatar-lg-custom').templateify({
                name: processImageAndName.makeNameSmaller(driverInfo.name),
                bg_color: driverInfo.status ? null : "#888"
            });
        } else {

            var imageSplit = imagePath.split("//");
            var path = "";
            if (imageSplit[1] === undefined) {
                path = "http://qt.com.dashboard.order.item.s3.amazonaws.com/94e4d44a807d4978af82a68d0ade9d5f.jpg";
            }
            else {
                path = "http://" + imageSplit[1];
            }


            driverImage = $("#image-avatar").templateify({
                image: path,
                large: true,
                blackAndWhite: driverInfo.status ? false : true
            });
        }
        return driverImage;
    }

    function getDriverRow(driverId, diverName, orderNo, raw) {
        var value = raw;
        var driverImage;
        var carrierName;
        var style = "";

        driverImage = adaptDriverImageData(value);
        carrierName = "<span>" + processImageAndName.treatCarrierName(value.name) + "</span>";

        var onDuty = "";
        if (value.status) {
            onDuty = "text-color-black";
        }

        var eachRow = utility.createDiv("each-row driver-column-margin " + onDuty, '', {
            'data-task': 'showHide',
            'data-hide': '#activeOrdersOfCarrierColoumn .each-row',
            'data-show': "[data-driverid='" + driverId + "']",
            'data-callback': "leftColumnButtonClick",
            'data-argument': "this",
            'data-driverid': driverId


        });


        var html = driverImage + " " +
            carrierName + " " +
            "-" +
            " " + "<strong>" + orderNo + "</strong>";

        eachRow.innerHTML = html;
        return eachRow;
    }

    function loadLeftColumn(suitableData) {
        $('#carriersColumn').html(' ');
        var counter = 0;
        $.each(suitableData, function (key, val) {
            var carrierUi = getDriverRow(val.driverId, val.driverName, val.orderNo, val.raw);
            if (carrierUi !== false) {
                $('#carriersColumn').append(carrierUi);
                counter++;
            }
        });

        if (counter > 0) {
            $("#no-driver-msg2").hide();
        }
        else {
            $("#no-driver-msg2").show();
        }
    }

    exports.generateDriverView = showDrivers;
    exports.generateDriverPaymentView = showDriverPayment;
    exports.formatCarriers = formatCarriers;
    exports.adaptingDashboardDriverData = adaptingDashboardDriverData;
    exports.adaptDriverImageData = adaptDriverImageData;
    exports.loadLeftColumn = loadLeftColumn;
    exports.adaptingDashboardOrderData = adaptingDashboardOrderData;
    exports.adaptingEachOrderCommon = adaptingEachOrderCommon;
}());