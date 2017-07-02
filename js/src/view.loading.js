/**
 * Created by kawnayeen on 10/19/16.
 */
import BillingController from './billing.controller';
import SettingsController from './settings.controller';

(function () {
    "use strict";

    var dataManager;
    var currency_symbol = '$';
    var currency_code = 'USD';
    var driverViewGenerator = require("./driver.view.generator");
    let settingsViewGenerator;
    let billingViewGenerator;
    var orderViewGenerator = require("./order.controller");
    var mapViewGenerator = require("./map.controller");
    var dateTimeHelper = require("./dateTimeHelper");
    var reportViewGenerator = require("./report.controller");

    function adaptingDashboardOrderDataUnassigned(input) {
        var returnOrderData = [];
        $.each(input, function (key, val) {
            var toPush = driverViewGenerator.adaptingEachOrderCommon(val);
            returnOrderData.push(toPush);
        });

        return returnOrderData;
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

    function adaptOrderStatusData(orderStatus) {
        var status = '';
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


    function loadAccountInfo() {
        var dataToShow = '';
        $("#dashboardDiv").putTemplate("#template-account-info", dataToShow);
        var position = $("#dashboardDiv").offset();
        $('#menuDivDropdown').css('min-height', $(document).innerHeight() - position.top);
        $.get("currency.html", function (data) {
            $("#currencyPush").append(data);
        });
        $("#currerncyShown").attr('data-option', currency_code);
        $('#hiddenCurrencyInputId').val(currency_code);
    }

    function loadSettingsInfo() {
        settingsViewGenerator.showSettings();
    }

    function loadBillingInfo() {
        billingViewGenerator.showBillingTable();
    }

    function loadOrder() {
        console.log("order");
        var dataToShow = '';
        $("#dashboardDiv").putTemplate("#template-order-info", dataToShow);
        $('.orderButtonsContainer a').removeClass('active');
        $('#activeOrder').addClass('active');
        $(".has-order-table").hide();
        $(".active-order-wrapper").show();
        orderViewGenerator.generateActiveOrderTable(dataManager.getActiveOrderData());
    }

    function loadScheduledOrder() {
        console.log("scheduled");
        $('.orderButtonsContainer a').removeClass('active');
        $('#scheduledOrder').addClass('active');
        $(".has-order-table").hide();
        $(".incomplete-order-wrapper").show();
        orderViewGenerator.generateFutureOrderTable(dataManager.getFutureOrderData());
    }

    function loadPastOrder() {
        console.log("past order");
        $('.orderButtonsContainer a').removeClass('active');
        $('#pastOrder').addClass('active');

        $(".has-order-table").hide();
        $(".completed-order-wrapper").show();
        $('#table-past-order').DataTable({
            "paging": false,
            "ordering": false,
            "info": false,
            "searching": false
        });
    }

    function loadDriver() {
        var driverData = '';
        $("#dashboardDiv").putTemplate('#template-driver-info', driverData);
        $('.driverButtonsContainer a').removeClass('active');
        $('#driver').addClass('active');
        $(".addDriver").show();
        $(".exportToExcelDriverPayment").hide();
        $(".driver-info-table").hide();
        $(".driver-list-wrapper").show();
        driverViewGenerator.generateDriverView(dataManager.getDriverList());

    }

    function loadDriverPayment() {

        $(".driver-info-table").hide();
        $(".driver-payment-wrapper").show();
        $('.driverButtonsContainer a').removeClass('active');
        $('#driverPayment').addClass('active');
        $(".addDriver").hide();
        $(".exportToExcelDriverPayment").show();
        driverViewGenerator.generateDriverPaymentView(dataManager.getDriverPaymentList());
    }

    function loadDashboard() {

        $("#dashboardDiv").putTemplate("#template-dashboard", '');
        var position = $("#dashboardDiv").offset();
        var position2 = $("#assigndOrdersDiv").offset();
        $("#compressed-with-map").putTemplate("#template-map", '');
        var adaptedDataForNotAcceptedOrder = adaptingDashboardOrderDataUnassigned(dataManager.getActiveOrderData());
        $("#currentOrderContainer").putTemplate("#template-dashboard-orders", adaptedDataForNotAcceptedOrder);
        var adaptedDataForDriver = driverViewGenerator.adaptingDashboardDriverData(dataManager.getDriverList());

        driverViewGenerator.loadLeftColumn(adaptedDataForDriver);
        var adaptedDataForOrder = driverViewGenerator.adaptingDashboardOrderData(dataManager.getDriverList());
        $("#activeOrdersOfCarrierColoumn").putTemplate("#template-dashboard-orders", adaptedDataForOrder);
        var div1Height = $("body").height();
        var position = $("#dashboardDiv").offset();


        console.log("assignedOrder:" + position.top + " div1Height:" + div1Height + " $('.dashboardButtonsContainer').height()" + $(".dashboardButtonsContainer").height() + " dashboard-div:" + $(".dashboard-div").height());
        var height = $(".dashboardButtonsContainer").height();
        $("#driverHeader").height(height);
        $(".dashboardButtonsContainer").height(height + 8);


        $("#compressed-with-map").css('min-height', $(document).outerHeight() - position.top);
        $("#compressed-with-map").hide();
        $(".left-wrapper").removeClass('margin-top-60');
        $("#expand-without-map").removeClass('col-sm-6').addClass('col-sm-12');
    }

    function loadMap() {
        console.log("showing map");
        $("#dashboardDiv").putTemplate("#template-map", '');
        var position = $("#dashboardDiv").offset();
        mapViewGenerator.initQTMap(40.730610, -73.935242);
        mapViewGenerator.showActorsOnMap(dataManager.getActorPointsData());
    }


    function loadReport() {
        var dataToShow = dataManager.getDriverPaymentReport();
        $("#dashboardDiv").putTemplate("#template-report", dataToShow);
        var position = $("#dashboardDiv").offset();
    }

    function loadView(view) {
        switch (view) {
            case 'accountInfo':
                loadAccountInfo();
                break;
            case 'report':
                loadReport();
                break;
            case 'settingsInfo':
                loadSettingsInfo();
                break;
            case 'billingInfo':
                loadBillingInfo();
                break;
            case 'dashboard':
                loadDashboard();
                break;
            case 'map':
                loadMap();
                break;
            case 'order':
                loadOrder();
                break;
            case 'orderScheduled':
                loadScheduledOrder();
                break;
            case 'orderPast':
                loadPastOrder();
                break;
            case 'driver':
                loadDriver();
                break;
            case 'driverPayment':
                loadDriverPayment();
                break;
            default:
                console.log('Set attr: data-arg or href correctly.');
        }
    }

    function initialize(data) {
        dataManager = data;
        billingViewGenerator = new BillingController(dataManager);
        settingsViewGenerator = new SettingsController(dataManager);
    }

    exports.loadView = loadView;
    exports.initialize = initialize;

}());