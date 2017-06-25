(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _login = require("./login.controller");

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    "use strict";

    var viewLoader = require('./view.loading');
    var dataManager = require('./data.manager');
    var mapViewGenerator = require("./map.controller");

    var contentNodeId = "div#contentToPush";
    var bodyNode = null;
    var qtController = null;

    function QtController() {
        this.loginPageContent = "views/loginPage.html";
        this.dashboardContainerContent = "views/dbContainer.html";
        this.mapContent = "views/map.html";
        this.avatarImageTemplateContent = "views/avatarImageTemplate.html";
        this.dashboardContent = "views/dashboard.html";
        this.accountInfoContent = "views/accountInfo.html";
        this.billingInfoContent = "views/billingInfo.html";
        this.driverInfoContent = "views/driverInfo.html";
        this.settingsInfoContent = "views/settingsInfo.html";
        this.reportContent = "views/report.html";
        this.orderContent = "views/order.html";
        this.propicChangeContent = "views/propicChange.html";
        this.passwordChangeContent = "views/passwordChange.html";
        this.locationChangeContent = "views/locationChange.html";
        this.orderItemContent = "views/orderItemRow.html";
        this.orderDetailContent = "views/orderDetail.html";
        this.dashboardOrderRowContent = "views/dashboardOrderRow.html";
    }

    QtController.prototype.loadLoginPage = function () {
        $.get(this.loginPageContent, function (data) {
            $(contentNodeId).html(data);
            new _login2.default(qtController);
        });
    };

    QtController.prototype.loadDashboardPage = function () {
        console.log("Loading dashboard page");

        $.get(this.dashboardContainerContent, function (data) {
            $(contentNodeId).html(data);
            addHashChangeEvent();
        });

        $.get(this.dashboardContent, function (data) {
            bodyNode.append(data);
        });
        $.get(this.mapContent, function (data) {
            bodyNode.append(data);
        });
        $.get(this.avatarImageTemplateContent, function (data) {
            bodyNode.append(data);
        });
        $.get(this.accountInfoContent, function (data) {
            bodyNode.append(data);
        });

        $.get(this.billingInfoContent, function (data) {
            bodyNode.append(data);
        });

        $.get(this.driverInfoContent, function (data) {
            bodyNode.append(data);
        });

        $.get(this.settingsInfoContent, function (data) {
            bodyNode.append(data);
        });

        $.get(this.reportContent, function (data) {
            bodyNode.append(data);
        });

        $.get(this.orderContent, function (data) {
            bodyNode.append(data);
        });

        $.get(this.propicChangeContent, function (data) {
            bodyNode.append(data);
        });

        $.get(this.passwordChangeContent, function (data) {
            bodyNode.append(data);
        });

        $.get(this.locationChangeContent, function (data) {
            bodyNode.append(data);
        });

        $.get(this.orderItemContent, function (data) {
            bodyNode.append(data);
        });

        $.get(this.orderDetailContent, function (data) {
            bodyNode.append(data);
        });

        $.get(this.dashboardOrderRowContent, function (data) {
            bodyNode.append(data);
        });

        $.get("resources/driverdata.json", function (data) {
            dataManager.setDriverList(data);
        });

        $.get("resources/settingsdata.json", function (data) {
            dataManager.setSettingsData(data);
        });

        $.get("resources/activeorders.json", function (data) {
            dataManager.setActiveOrdersData(data);
        });

        $.get("resources/futureorders.json", function (data) {
            dataManager.setFutureOrdersData(data);
        });

        $.get("resources/driverpayment.json", function (data) {
            dataManager.setDriverPaymentList(data);
        });

        $.get("resources/markerpoints.json", function (data) {
            dataManager.setActorPointsData(data);
        });
    };

    $(document).ready(function () {
        $(window).resize(function () {
            //setDivHeight();
        });
        bodyNode = $("body");
        qtController = new QtController();
        qtController.loadLoginPage();

        $(document).on('click', "[data-toggle='open-new-driver']", function () {
            $("#modal-New-driver").modal('show');
        });

        $(document).on('click', "[data-toggle='driver-profile']", function () {
            var driverId = $(this).data('driver-id');
            $("#modal-driver-profile").modal('show');

            $("#modal-driver-profile .show-after-loading").putTemplate("#template-driver-profile", '');
        });

        $(document).ready(function () {
            $(document).on('click', "#expand-compress-icon", function (e) {
                e.preventDefault();
                $("#compressed-with-map").show();
                $("#expand-without-map").removeClass('col-sm-12').addClass('col-sm-6');
                mapViewGenerator.initQTMap(40.730610, -73.935242);
                mapViewGenerator.showActorsOnMap(dataManager.getActorPointsData());
            });
            $(document).on('change', "[name='email-setting']", function () {
                alert('button change working');
            });
            $(document).on('change', "input[type=radio]", function () {
                alert('button change working');
            });

            $(document).on('click', "#locationChange", function (e) {
                e.preventDefault();
                var dataToShow;
                $('#currencyDiv').hide();
                $("#menuDivDropdown").putTemplate("#template-location-change", dataToShow);
                var position = $("#dashboardDiv").offset();
                $("#dashboardDiv").height($(document).innerHeight() - position.top);
            });

            $(document).on('click', "#propicChange", function (e) {
                e.preventDefault();
                $('#currencyDiv').hide();
                var dataToShow;
                var src = $(this).attr('value');

                $("#menuDivDropdown").putTemplate("#template-propic-change", dataToShow);
                var position = $("#dashboardDiv").offset();
                $("#dashboardDiv").height($(document).innerHeight() - position.top);
                if (src !== "" && src !== null) $("#setPicture").attr('src', src);
            });

            $(document).on('click', "#passChange", function (e) {
                e.preventDefault();
                $('#currencyDiv').hide();
                var dataToShow;
                $("#menuDivDropdown").putTemplate("#template-password-change", dataToShow);
                var position = $("#dashboardDiv").offset();
                $("#dashboardDiv").height($(document).innerHeight() - position.top);
            });

            //cancel button in menus
            $(document).on('click', "[data-task='profile']", function (e) {
                e.preventDefault();
                viewLoader.loadView('accountInfo');
            });
        });
        var $window = $(window),
            $body = $('body');

        $('.nav').append('<a href="#" class="close"></a>').appendTo($body).panel({
            delay: 500,
            hideOnClick: true,
            hideOnSwipe: true,
            resetScroll: true,
            resetForms: true,
            side: 'right',
            target: $body,
            visibleClass: 'is-menu-visible'
        });
    });

    function addBackToPrevHashEvent() {
        $(document).on('click', "[data-task='back']", function (e) {
            e.preventDefault();
            history.back();
        });
    }

    function addHashChangeEvent() {
        window.addEventListener("hashchange", hashChanged, false);
        viewLoader.initialize(dataManager);
    }

    function hashChanged() {
        var newHash = location.hash;
        var loadUrl = newHash.substring(1);

        if (!loadUrl) {
            viewLoader.loadView('dashboard');
        } else if (loadUrl === 'dashboard' || loadUrl === 'map') {
            $("#navbarUnderline").hide();
            viewLoader.loadView(loadUrl);
        } else {
            $("#navbarUnderline").show();
            viewLoader.loadView(loadUrl);
        }
    }

    function setDivHeight() {
        var div1Height = $("body").height();
        var position = $("#dashboardDiv").offset();

        $(".dashboardButtonsContainer").height(div1Height - position.top);
    }
})(); /**
       * Created by KK on 10/18/16.
       */

},{"./data.manager":3,"./login.controller":6,"./map.controller":7,"./view.loading":13}],2:[function(require,module,exports){
"use strict";

/**
 * Created by Amit  on 11/15/16.
 */
(function () {
    "use strict";

    function showBillingTable() {
        $('#billingTable').DataTable({
            "paging": false,
            "ordering": false,
            "info": false,
            "searching": false
        });
    }

    exports.generateBillingTable = showBillingTable;
})();

},{}],3:[function(require,module,exports){
"use strict";

/**
 * Created by kawnayeen on 10/19/16.
 */
(function () {
    "use strict";

    var billingInfo = {
        "companyId": 4,
        "areaId": 6,
        "billingInfos": [{
            "id": 0,
            "startDate": "2016-09-01",
            "endDate": "2016-09-30",
            "numberOfOrders": 1,
            "totalAmount": 0,
            "paid": false
        }, {
            "id": 0,
            "startDate": "2016-05-01",
            "endDate": "2016-05-31",
            "numberOfOrders": 1,
            "totalAmount": 0,
            "paid": false
        }]
    };

    var driverPaymentReport = {
        "success": true,
        "graph_data": {
            "Moin Islam": 19.969999999999998863131622783839702606201171875,
            "rumana": 7.9900000000000002131628207280300557613372802734375,
            "S Ahmed Sam": 0,
            "Charmi": 0
        },
        "start_date": "2017-03-20T08:00:00.000Z",
        "end_date": "2017-03-21T08:00:00.000Z"
    };

    var orderDetailsInfo = {
        "success": "true",
        "orders": [{
            "order_id": "62573",
            "order_number": "987989",
            "customer_name": "Amit Biswas",
            "customer_address": "Delhi, India",
            "customer_formatted_address": "Delhi, India",
            "customer_phone": "435435",
            "delivery_latitude": "28.7040592",
            "delivery_longitude": "77.10249019999999",
            "resturant_name": "Questtag Cafe",
            "resturant_address": "Houston, TX, United States",
            "resturant_formatted_address": "Houston, TX, USA",
            "resturant_phone": "222222",
            "carrier_name": "Not assigned",
            "carrier_phone": "Not assigned",
            "carrier_image_path": "Not assigned",
            "accepted": "false",
            "pickup_latitude": "29.7604267",
            "pickup_longitude": "-95.3698028",
            "distance_between_pickup_delivery": "8366.905008223539",
            "driving_time_between_pickup_delivery": "1923599.2722763529",
            "placement_time": "2017-03-12 07:57:09",
            "expected_delivery_date": "2017-03-12",
            "expected_pickup_time": "08:22:00",
            "expected_delivery_time": "08:52:00",
            "order_item": "[{name:kjhkjjhk,quantity:1,unitPrice:7}]",
            "order_items": [{
                "id": 178322,
                "name": "kjhkjjhk",
                "detail": "",
                "quantity": 1,
                "unit_price": 7,
                "add_ons_json": null
            }],
            "assigned_carrier_id": "-1",
            "assaigned_time": "null",
            "start_time": "null",
            "pickup_time": "null",
            "arrived_time": "null",
            "delivery_time": "null",
            "signature_path": "",
            "signature_location_latitude": "null",
            "signature_location_longitude": "null",
            "feedback": "null",
            "total_cost": "7.49",
            "delivery_fee": "-1.00",
            "tip": "-1.00",
            "cash_tip": "0.00",
            "discount_amount": "-1.00",
            "tax": "0.49",
            "order_source": "NOT PROVIDED",
            "delivery_instruction": "kjhkjhkj",
            "payment_type": "N/A",
            "credit_card_type": "N/A",
            "credit_card_id": "null",
            "incomplete": "false",
            "scheduled": "true",
            "parent_id": "0",
            "dispatcher_note": "null",
            "orderStatus": "NOT_ASSIGNED",
            "is_force_completed": "false",
            "rejected_carriers": [],
            "order_image": "null",
            "order_thumb_image": "null"
        }]
    };

    var driverList;
    var driverPaymentList;
    var settingsData;
    var activeOrdersData;
    var futureOrdersData;
    var actorPoints;

    function getBillingInfo() {
        return billingInfo;
    }

    function getOrderDetails() {
        return orderDetailsInfo;
    }

    function setDriverList(drivers) {
        driverList = drivers;
    }

    function getDriverList() {
        return driverList;
    }

    function setDriverPaymentList(paymentInfos) {
        driverPaymentList = paymentInfos;
    }

    function getDriverPaymentList() {
        return driverPaymentList;
    }

    function getDriverPaymentReportData() {
        return driverPaymentReport;
    }

    function setSettingsData(settings) {
        settingsData = settings;
    }

    function getSettingsData() {
        return settingsData;
    }

    function setActiveOrdersData(settings) {
        activeOrdersData = settings;
    }

    function getActiveOrdersData() {
        return activeOrdersData;
    }

    function setFutureOrdersData(settings) {
        futureOrdersData = settings;
    }

    function getFutureOrdersData() {
        return futureOrdersData;
    }

    function setActorPointsData(markerPoints) {
        actorPoints = markerPoints;
    }

    function getActorPointsData() {
        return actorPoints;
    }

    exports.getBillingInfo = getBillingInfo;
    exports.setDriverList = setDriverList;
    exports.getDriverList = getDriverList;
    exports.setDriverPaymentList = setDriverPaymentList;
    exports.getDriverPaymentList = getDriverPaymentList;
    exports.getSettingsData = getSettingsData;
    exports.setSettingsData = setSettingsData;
    exports.setActiveOrdersData = setActiveOrdersData;
    exports.getActiveOrdersData = getActiveOrdersData;
    exports.setFutureOrdersData = setFutureOrdersData;
    exports.getFutureOrdersData = getFutureOrdersData;
    exports.setActorPointsData = setActorPointsData;
    exports.getActorPointsData = getActorPointsData;
    exports.getOrderDetailsData = getOrderDetails;
    exports.getDriverPaymentReportData = getDriverPaymentReportData;
})();

},{}],4:[function(require,module,exports){
'use strict';

/**
 *
 */
(function () {
    "use strict";

    var MILISECONDS_TO_MINUTE = 60000;
    var A_M = 'a.m.';
    var P_M = 'p.m.';

    var timeInMiilis = {
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
    };
    timeInMiilis.second = 1000;
    timeInMiilis.minute = timeInMiilis.second * 60;
    timeInMiilis.hour = timeInMiilis.minute * 60;
    timeInMiilis.day = timeInMiilis.hour * 24;
    timeInMiilis.month = timeInMiilis.day * 30;
    timeInMiilis.year = timeInMiilis.day * 365;

    function formatTimeInDashbord(dateTime) {
        var toretun = dateTime;
        var date = getMonthDateFromDateTime(dateTime);
        var time = getTimeFromDateTime(dateTime);
        return date + "&nbsp;   " + time;
    }

    function getTodayYearMonthData() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        mm = mm < 10 ? "0" + mm : mm;
        dd = dd < 10 ? "0" + dd : dd;
        var yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    }

    function addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }

    function getTimeHourMinute(date) {
        var hour = date.getHours();
        var minute = date.getMinutes();
        var meridiem;

        if (hour > 12) {
            hour -= 12;
            meridiem = "PM";
        } else if (hour === 12) {
            meridiem = "PM";
        } else {
            meridiem = "AM";
        }

        hour = hour < 10 ? "0" + hour : hour;
        minute = minute < 10 ? "0" + minute : minute;

        return hour + ":" + minute + " " + meridiem;
    }

    function getTimeForTimePicker(offsetMinute) {
        var theTime = addMinutes(new Date(), offsetMinute);
        return getTimeHourMinute(theTime);
    }

    function getDateForTableFilterMonthDateYear(date) {
        var yyyy = date.getFullYear();
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        dd = dd < 10 ? "0" + dd : dd;
        var monthName = getMonthFromNumber(mm);

        return monthName + " " + dd + ", " + yyyy;
    }

    function getDateForTableFilterToday() {
        return getDateForTableFilterMonthDateYear(new Date());
    }

    function getDateForTableFilterTomorrow() {
        var date = new Date();
        date.setDate(date.getDate() + 1);
        return getDateForTableFilterMonthDateYear(date);
    }

    function getDateForTableFilterYesterday() {
        var date = new Date();
        date.setDate(date.getDate() - 1);
        return getDateForTableFilterMonthDateYear(date);
    }

    function getThisWeekRange() {
        var date = new Date();
        var returnDate = [];
        var dayNo = date.getDay();
        var init = dayNo;
        //alert("dasdd");
        var offsetDate = new Date();
        offsetDate.setDate(date.getDate() - init);
        returnDate[0] = getDateForTableFilterMonthDateYear(offsetDate);

        offsetDate = new Date();
        offsetDate.setDate(date.getDate() - init + 6);
        returnDate[1] = getDateForTableFilterMonthDateYear(offsetDate);
        return returnDate;
    }

    function getThisMonthRange() {
        var date1 = new Date();
        date1.setDate(1);

        var date2 = new Date();
        date2.setMonth(date2.getMonth() + 1);
        date2.setDate(0);
        return [getDateForTableFilterMonthDateYear(date1), getDateForTableFilterMonthDateYear(date2)];
    }

    function getDateForTableFilterThisWeek() {
        var date = new Date();
        var returnStr = "";
        var dayNo = date.getDay();
        var init = dayNo;
        //alert("dasdd");
        for (var i = 0; i <= 6; i++) {
            var offsetDate = new Date();
            offsetDate.setDate(offsetDate.getDate() + (i - init));
            returnStr += getDateForTableFilterMonthDateYear(offsetDate) + "|";
        }
        returnStr = returnStr.substr(0, returnStr.length - 1);
        return returnStr;
    }

    function extractDateTimeFrom(tempDateTime) {
        var tempYears = tempDateTime.year;
        var tempMonths = tempDateTime.monthOfYear;
        var tempDate = tempDateTime.dayOfMonth;
        var tempHours = tempDateTime.hourOfDay;
        var tempMinutes = tempDateTime.minuteOfHour;
        var tempSeconds = tempDateTime.secondOfMinute;
        if (tempMonths < 10) {
            tempMonths = '0' + tempMonths;
        }
        if (tempDate < 10) {
            tempDate = '0' + tempDate;
        }
        if (tempHours < 10) {
            tempHours = '0' + tempHours;
        }
        if (tempMinutes < 10) {
            tempMinutes = '0' + tempMinutes;
        }
        if (tempSeconds < 10) {
            tempSeconds = '0' + tempSeconds;
        }
        var ConvertableDateTime = tempYears + '-' + tempMonths + '-' + tempDate + ' ' + tempHours + ':' + tempMinutes + ':' + tempSeconds;
        return ConvertableDateTime;
    }

    function convertToBrowsersDateTime(tempDateTime) {
        var browserdateLocal;
        if (tempDateTime.indexOf('T') > 0) {
            browserdateLocal = new Date(tempDateTime);
        } else {
            var serverDateUTC = tempDateTime.replace(/-/g, '/');
            serverDateUTC = serverDateUTC + ' UTC';
            browserdateLocal = new Date(serverDateUTC);
        }

        return browserdateLocal;
    }

    function convertDateTimeToJsDate(date, time) {
        return convertToBrowsersDateTime(date + " " + time);
    }

    function pickupTimeOk(date, time) {
        var pickupDateTime = convertDateTimeToJsDate(date, time).getTime() + 5 * 60 * 1000;
        var currentTime = new Date().getTime();
        if (currentTime > pickupDateTime) {
            return false;
        }
        return true;
    }

    function deliveryTimeOk(date, time, timeNeededToReach) {
        var deliveryDateTime = convertDateTimeToJsDate(date, time).getTime();
        var currentTime = new Date().getTime();
        timeNeededToReach = 20 * 60 * 1000;
        if (currentTime + 5 * 60 * 1000 + timeNeededToReach > deliveryDateTime) {
            return false;
        }
        return true;
    }

    function getTimeFromDateTime(tempDateTime) {
        var tempHours = tempDateTime.getHours();
        var tempMinutes = tempDateTime.getMinutes();
        var periodicHours, period;
        if (tempHours >= 12) {
            period = P_M;
        } else {
            period = A_M;
        }
        periodicHours = tempHours % 12;
        if (periodicHours === 0) {
            periodicHours = 12;
        }
        if (tempMinutes < 10) {
            tempMinutes = '0' + tempMinutes;
        }
        var tempTime = periodicHours + ':' + tempMinutes + ' ' + period;
        return tempTime;
    }

    function getTimeFromDateTimeWithoutPeriod(tempDateTime) {
        var tempHours = tempDateTime.getHours();
        var tempMinutes = tempDateTime.getMinutes();
        if (tempMinutes < 10) {
            tempMinutes = '0' + tempMinutes;
        }

        var tempTime = tempHours + ':' + tempMinutes;
        return tempTime;
    }

    function getMonthFromNumber(month) {
        switch (month) {
            case 1:
                return 'Jan';
            case 2:
                return 'Feb';
            case 3:
                return 'Mar';
            case 4:
                return 'Apr';
            case 5:
                return 'May';
            case 6:
                return 'Jun';
            case 7:
                return 'Jul';
            case 8:
                return 'Aug';
            case 9:
                return 'Sep';
            case 10:
                return 'Oct';
            case 11:
                return 'Nov';
            case 12:
                return 'Dec';
        }
    }

    function getDateFromDateTime(tempDateTime) {
        var tempYears = tempDateTime.getFullYear();
        var tempMonths = tempDateTime.getMonth() + 1;
        var tempDate = tempDateTime.getDate();
        var monthName = getMonthFromNumber(tempMonths);
        if (tempDate < 10) {
            tempDate = '0' + tempDate;
        }
        var tempTime = monthName + ' ' + tempDate + ', ' + tempYears;
        return tempTime;
    }

    function getMonthDateFromDateTime(tempDateTime) {
        var tempMonths = tempDateTime.getMonth() + 1;
        var tempDate = tempDateTime.getDate();
        var monthName = getMonthFromNumber(tempMonths);
        if (tempDate < 10) {
            tempDate = '0' + tempDate;
        }
        var tempTime = monthName + ' ' + tempDate + ',';
        return tempTime;
    }

    function getReadableFormatFromDateTime(tempDateTime) {
        var tempYears = tempDateTime.getFullYear();
        var tempMonths = tempDateTime.getMonth() + 1;
        var tempDate = tempDateTime.getDate();
        var tempHours = tempDateTime.getHours();
        var tempMinutes = tempDateTime.getMinutes();
        var tempSeconds = tempDateTime.getSeconds();
        if (tempMonths < 10) {
            tempMonths = '0' + tempMonths;
        }
        if (tempDate < 10) {
            tempDate = '0' + tempDate;
        }
        if (tempHours < 10) {
            tempHours = '0' + tempHours;
        }
        if (tempMinutes < 10) {
            tempMinutes = '0' + tempMinutes;
        }
        if (tempSeconds < 10) {
            tempSeconds = '0' + tempSeconds;
        }
        var ReadableDateTime = tempDate + '-' + tempMonths + '-' + tempYears + ' ' + tempHours + ':' + tempMinutes + ':' + tempSeconds;

        return ReadableDateTime;
    }

    function getDuration(startDateTime, endDateTime) {
        var tempDuration = endDateTime.getTime() - startDateTime.getTime();
        return tempDuration;
    }

    function convertMilisecondsToMinutes(tempMiliseconds) {
        var tempMinutes = Math.round(tempMiliseconds / MILISECONDS_TO_MINUTE);
        return tempMinutes;
    }

    function getElapsedTime(placementTime) {
        var browserPlacementTime = convertToBrowsersDateTime(placementTime);
        var currentDateTime = new Date();
        var tempTimeElapsed = getDuration(browserPlacementTime, currentDateTime);
        return tempTimeElapsed;
    }

    function getDeliveryTime(placementTime, deliveryTime) {
        var browserPlacementTime = convertToBrowsersDateTime(placementTime);
        var browserdeliveryTime = convertToBrowsersDateTime(deliveryTime);
        var tempTimeElapsed = getDuration(browserPlacementTime, browserdeliveryTime);
        return tempTimeElapsed;
    }

    function covertTo24HourFormat(tempTime) {
        var convertedTime, finalHours;
        var hours = parseInt(tempTime.substring(0, tempTime.indexOf(':')));
        if (tempTime.indexOf('PM') > 0) {
            if (hours !== 12) {
                convertedTime = hours + 12 + ':' + tempTime.substring(tempTime.indexOf(':') + 1, tempTime.indexOf('P') - 1) + ':' + '00';
            } else {
                convertedTime = hours + ':' + tempTime.substring(tempTime.indexOf(':') + 1, tempTime.indexOf('P') - 1) + ':' + '00';
            }
        } else {
            if (hours !== 12) {
                if (hours < 10) {
                    convertedTime = '0' + hours + ':' + tempTime.substring(tempTime.indexOf(':') + 1, tempTime.indexOf('A') - 1) + ':' + '00';
                } else {
                    convertedTime = hours + ':' + tempTime.substring(tempTime.indexOf(':') + 1, tempTime.indexOf('A') - 1) + ':' + '00';
                }
            } else {
                convertedTime = '00' + ':' + tempTime.substring(tempTime.indexOf(':') + 1, tempTime.indexOf('A') - 1) + ':' + '00';
            }
        }
        return convertedTime;
    }

    function convertToUTCDateTime(tempDateTime) {
        var date = new Date(tempDateTime);
        var date2 = new Date(date.getTime() + new Date().getTimezoneOffset() * 60000);
        return date2.toUTCString();
    }

    function getMonthNumber(month) {
        switch (month) {
            case 'Jan':
                return 1;
            case 'Feb':
                return 2;
            case 'Mar':
                return 3;
            case 'Apr':
                return 4;
            case 'May':
                return 5;
            case 'Jun':
                return 6;
            case 'Jul':
                return 7;
            case 'Aug':
                return 8;
            case 'Sep':
                return 9;
            case 'Oct':
                return 10;
            case 'Nov':
                return 11;
            case 'Dec':
                return 12;
        }
    }

    function HReadableToSqlFormat(tempDate) {

        var date = tempDate.substring(4, 6);
        var monthInWord = tempDate.substring(0, 3);
        var month;
        var year = tempDate.substring(8);
        var monthInNumber = getMonthNumber(monthInWord);
        if (monthInNumber < 10) {
            month = '0' + monthInNumber;
        } else {
            month = monthInNumber;
        }
        var formatedDate = year + '-' + month + '-' + date;
        return formatedDate;
    }

    function convertToSqlDateFormat(tempDate) {
        //input format : Tue, 11 Aug 2015
        var month;
        var date = tempDate.substring(5, 7);
        var monthInWord = tempDate.substring(8, 11);
        var year = tempDate.substring(12);
        var monthInNumber = getMonthNumber(monthInWord);
        if (monthInNumber < 10) {
            month = '0' + monthInNumber;
        } else {
            month = monthInNumber;
        }
        var formatedDate = year + '-' + month + '-' + date;
        return formatedDate;
    }

    function getBrowserTimeZoneOffset() {
        var timeZoneOffsetInMinute = new Date().getTimezoneOffset();
        var timezoneOffsetInHMS;
        if (timeZoneOffsetInMinute < 0) {
            timezoneOffsetInHMS = getHourMinuteSecondFromSeconds(timeZoneOffsetInMinute * -1 * 60);
            return "+" + timezoneOffsetInHMS;
        } else {
            timezoneOffsetInHMS = getHourMinuteSecondFromSeconds(timeZoneOffsetInMinute * 60);
            return "-" + timezoneOffsetInHMS;
        }
    }

    function getHourMinuteSecondFromSeconds(totalSeconds) {
        var hours = Math.floor(totalSeconds / (60 * 60));

        var divisorForMinutes = totalSeconds % (60 * 60);
        var minutes = Math.floor(divisorForMinutes / 60);

        var divisorForSeconds = divisorForMinutes % 60;
        var seconds = Math.ceil(divisorForSeconds);

        if (hours < 10) {
            hours = '0' + hours;
        }

        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        return hours + ':' + minutes + ':' + seconds;
    }

    function getDateAndTimeFromDateTime(dateTime) {
        var date = getDateFromDateTime(dateTime);
        var time = getTimeFromDateTime(dateTime);
        var readableLocalTime = date + "&nbsp;&nbsp;   " + time;
        return readableLocalTime;
    }

    function dateDiff(d1, d2) {
        var timeDiff;
        if (d1 > d2) timeDiff = d1 - d2;else timeDiff = d2 - d1;

        var diffs = {
            year: 0,
            month: 0,
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        };

        for (var key in diffs) {
            if (diffs.hasOwnProperty(key)) {
                diffs[key] = Math.floor(timeDiff / timeInMiilis[key]);
                timeDiff -= diffs[key] * timeInMiilis[key];
            }
        }

        return diffs;
    }

    function getMonthDateYearWithoutDateFunc(tempDate) {

        var d = tempDate.split(/[\/\-\.\T]/, 3);
        var monthName = getMonthFromNumber(parseInt(d[1]));
        return monthName + " " + d[2] + ", " + d[0];
    }

    exports.pickupTimeOk = pickupTimeOk;
    exports.getTimeHourMinute = getTimeHourMinute;
    exports.getDateForTableFilterToday = getDateForTableFilterToday;
    exports.getDateForTableFilterTomorrow = getDateForTableFilterTomorrow;
    exports.getDateForTableFilterYesterday = getDateForTableFilterYesterday;
    exports.getThisWeekRange = getThisWeekRange;
    exports.getTodayYearMonthData = getTodayYearMonthData;
    exports.getThisMonthRange = getThisMonthRange;
    exports.getDateForTableFilterThisWeek = getDateForTableFilterThisWeek;
    exports.getTimeForTimePicker = getTimeForTimePicker;
    exports.getReadableFormatFromDateTime = getReadableFormatFromDateTime;
    exports.extractDateTimeFrom = extractDateTimeFrom;
    exports.deliveryTimeOk = deliveryTimeOk;
    exports.getTimeFromDateTimeWithoutPeriod = getTimeFromDateTimeWithoutPeriod;
    exports.getDeliveryTime = getDeliveryTime;
    exports.covertTo24HourFormat = covertTo24HourFormat;
    exports.convertToUTCDateTime = convertToUTCDateTime;
    exports.HReadableToSqlFormat = HReadableToSqlFormat;
    exports.convertToSqlDateFormat = convertToSqlDateFormat;
    exports.getBrowserTimeZoneOffset = getBrowserTimeZoneOffset;
    exports.getHourMinuteSecondFromSeconds = getHourMinuteSecondFromSeconds;
    exports.getDateAndTimeFromDateTime = getDateAndTimeFromDateTime;
    exports.getDateFromDateTime = getDateFromDateTime;
    exports.dateDiff = dateDiff;
    exports.getMonthDateYearWithoutDateFunc = getMonthDateYearWithoutDateFunc;
    exports.getMonthDateFromDateTime = getMonthDateFromDateTime;
    exports.getDateForTableFilterMonthDateYear = getDateForTableFilterMonthDateYear;
    exports.convertDateTimeToJsDate = convertDateTimeToJsDate;
    exports.formatTimeInDashbord = formatTimeInDashbord;
    exports.getDuration = getDuration;
    exports.getElapsedTime = getElapsedTime;
    exports.convertToBrowsersDateTime = convertToBrowsersDateTime;
    exports.getMonthDateYearWithoutDateFunc = getMonthDateYearWithoutDateFunc;
    exports.getMonthDateYearWithoutDateFunc = getMonthDateYearWithoutDateFunc;
    exports.getTimeFromDateTime = getTimeFromDateTime;
    exports.convertMilisecondsToMinutes = convertMilisecondsToMinutes;
    exports.getMonthFromNumber = getMonthFromNumber;
    exports.getMonthNumber = getMonthNumber;
    exports.addMinutes = addMinutes;
})();

},{}],5:[function(require,module,exports){
"use strict";

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
                returnOrderData.push(adaptingEachOrderCommon(orders));
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
                paymentDue = value.totalEarning;
            } else {
                phone = "<a href='tel:" + utility.correctPhoneFormat(value.phoneNumber) + "'>" + wrapInactiveDriverStyle(utility.correctPhoneFormat(value.phoneNumber)) + "</a>";
                completedDeliveries = value.completedDeliveries;
                deliveryFees = wrapInactiveDriverStyle(utility.adaptOrderCostInput(value.deliveryFees));
                onlineTips = wrapInactiveDriverStyle(utility.adaptOrderCostInput(value.onlineTips));
                earnings = wrapInactiveDriverStyle(utility.adaptOrderCostInput(value.tipsAnddeliveryFees));
                adjustments = adjustmentInput;
                paymentDue = wrapInactiveDriverStyle(utility.adaptOrderCostInput(value.totalEarning));
            }
            var temp = [driverImageAndName, phone, completedDeliveries, deliveryFees, onlineTips, earnings, adjustments, paymentDue];

            if (value.onDuty) tableDataSet.push(temp);else offDutyDataSet.push(temp);
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
            } else {

                driverID = wrapInactiveDriverStyle(personalId);
                email = wrapInactiveDriverStyle(value.email);
                status = wrapInactiveDriverStyle('Off Duty');
                vehicle = wrapInactiveDriverStyle(getVehicle(value.vehicle.type));
                phone = "<a href='tel:" + value.phoneNumber + "</a>";
                endShiftButton = generateEndShiftForOffDutyDriver(value);
            }

            var temp = [driverImageAndName, phone, email, driverID, vehicle, status, endShiftButton];

            if (value.status) tableDataSet.push(temp);else offDutyDataSet.push(temp);
        });

        return tableDataSet.concat(offDutyDataSet);
    }

    function wrapInactiveDriverStyle(val) {
        return "<span style='color: #9da3b3'>" + val + "</span>";
    }

    function generateDriverNameAndImage(driver) {
        return "<a href='javascript:void(0)' " + "class='' " + "data-toggle='driver-profile' " + "data-driver-id='" + driver.id + "'>" + driver.name + "</a>";
    }

    function getPersonalId(driver) {
        return !driver.personalId ? 'N/A' : driver.personalId;
    }

    function generateEndShiftForActiveDriver(driver) {
        return "<a href='javascript:void(0)' " + "class='btn btn-sm btn-questtag btn-block small-text-special' " + "data-task='carrier-end-shift' " + "data-refid='" + driver.shiftId + "'>End shift</a>";
    }

    function generateEndShiftForOffDutyDriver(driver) {
        return "<a href='javascript:void(0)'" + "class='btn btn-sm btn-questtag btn-block small-text-special'" + " data-task='carrier-end-shift'" + " data-refid='" + driver.shiftId + "'" + " disabled>End shift </a>";
    }

    function getVehicle(vehicleType) {
        var first = '<span class="fa ';
        var last = '"></span>';
        if (vehicleType === 'CAR') return first + 'fa-car' + last;
        if (vehicleType === 'BICYCLE') return first + 'fa-bicycle' + last;
        if (vehicleType === 'MOTORCYCLE') return first + 'fa-motorcycle' + last;
        if (vehicleType === 'MOTORBIKE') return first + 'fa-motorcycle' + last;
    }

    function showDrivers(driverInfo) {
        var tableData = adaptDriverView(driverInfo);
        $('#table_id_carrier').DataTable({

            "bFilter": false,
            paging: false,
            "info": false,
            "order": [[5, "desc"]],
            data: tableData,
            "aoColumns": [{ "bSortable": false, "className": 'nowrap' }, { "bSortable": false }, { "bSortable": false }, { "bSortable": false }, { "bSortable": false }, { "bSortable": false }, { "bSortable": false }]

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
            "aoColumns": [{ "bSortable": false, "className": 'nowrap' }, { "bSortable": false }, { "bSortable": false, "className": "text-center" }, { "bSortable": false }, { "bSortable": false }, { "bSortable": false }, { "bSortable": false }, { "bSortable": false }]

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
            } else {
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

        var html = driverImage + " " + carrierName + " " + "-" + " " + "<strong>" + orderNo + "</strong>";

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
        } else {
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
})();

},{"./dateTimeHelper":4,"./order.controller":8,"./processImageAndName":9,"./utility":12}],6:[function(require,module,exports){
/**
 * Created by Kawnayeen on 10/18/16.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Login = function () {
    function Login(qtController) {
        _classCallCheck(this, Login);

        this.qtController = qtController;
        this.formId = 'qtLoginForm';
        this.emailInputField = 'lgEmail';
        this.passwordInputField = 'lgPassword';
        this.loginForm = null;
        this.emailInput = null;
        this.passwordInput = null;
        this.initialize();
    }

    _createClass(Login, [{
        key: 'initialize',
        value: function initialize() {
            var _this = this;

            this.loginForm = document.getElementById(this.formId);
            this.emailInput = document.getElementById(this.emailInputField);
            this.passwordInput = document.getElementById(this.passwordInputField);
            this.loginForm.addEventListener('submit', function (event) {
                return _this.submitLoginForm(event);
            });
        }
    }, {
        key: 'submitLoginForm',
        value: function submitLoginForm(event) {
            event.preventDefault();
            var email = this.emailInput.value;
            var password = this.passwordInput.value;
            console.log(email + " : " + password);
            this.qtController.loadDashboardPage();
        }
    }]);

    return Login;
}();

exports.default = Login;

},{}],7:[function(require,module,exports){
'use strict';

/**
 * Created by Amit on 11/28/2016.
 */
(function () {
    "use strict";

    var processImageAndName = require('./processImageAndName');
    var orderController = require('./order.controller');
    var dateTimeHelper = require('./dateTimeHelper');

    var latitude = 0;
    var longitude = 0;
    var mapId = 'map_div';
    var mapInstance = null;
    var CARRIER = 'carriers';
    var CUSTOMER = 'customers';
    var RESTAURANT = 'restaurants';
    var allMarkersContainer = {};
    var allCarrierActors = [];
    var allCustomerActors = [];
    var allRestaurantActors = [];
    var carrierMarkerTemplate = $("#template-carrier-marker").html();
    var restaurantMarker = null;
    var closeImage = 'imgs/close.png';
    var RESTAURANT_IMAGE = 'imgs/map/restaurant.png';
    var CUSTOMER_IMAGE = 'imgs/map/home.png';

    function initQuestTagMap(lat, lng) {
        console.log("in map function");
        allMarkersContainer[CARRIER] = {};
        allMarkersContainer[CUSTOMER] = {};
        allMarkersContainer[RESTAURANT] = {};

        latitude = lat;
        longitude = lng;
        var geographicPoint = new google.maps.LatLng(latitude, longitude);

        var mapOptions = {
            center: geographicPoint,
            zoom: 12,
            disableDefaultUI: true,
            styles: getBlueWaterConfig(),
            disableDoubleClickZoom: true
        };
        mapInstance = new google.maps.Map(document.getElementById(mapId), mapOptions);
    }

    function showActorsOnMap(output) {
        processActorsInfo(output);
        setAllMarkers();
    }

    function addMarkerWithInfo(type, info, content) {
        info.lat = info.latitude;
        info.lng = info.longitude;
        addAMarker(type, info);
        addInfoBox(type, info, content);
        addMarkerEvent(type, info.id);
        saveMarkerInfo(type, info);
    }

    function setAllMarkers() {
        showAllDriverMarkers(allCarrierActors);
        showAllRestaurantMarkers(allRestaurantActors);
        showAllCustomerMarkers(allCustomerActors);
    }

    function processActorsInfo(output) {
        if (output.success === 'true') {
            allCarrierActors = output.carrier_actors;
            allCustomerActors = output.customer_actors;
            allRestaurantActors = output.restaurant_actors;
            return true;
        } else {
            return false;
        }
    }

    function showAllDriverMarkers(carrierList) {
        for (var key in carrierList) {
            if (carrierList.hasOwnProperty(key)) {
                showDriverMarker(carrierList[key]);
            }
        }
    }

    function showAllCustomerMarkers(customerList) {

        for (var key in customerList) {
            if (customerList.hasOwnProperty(key)) {
                showCustomerMarker(customerList[key]);
            }
        }
    }

    function showAllRestaurantMarkers(restaurantList) {

        for (var key in restaurantList) {
            if (restaurantList.hasOwnProperty(key)) {
                showRestaurantMarker(restaurantList[key]);
            }
        }
    }

    function showRestaurantMarker(info) {
        console.log("showing restaurant marker");
        info.type = RESTAURANT;
        info.toolTip = true;

        if (info.icon === null || info.icon === undefined) {
            info.icon = RESTAURANT_IMAGE;
        }
        var opacity = 1;

        info.iconContent = getRestaurantMarkerContent({
            name: info.numberOfOrder,
            "opacity": opacity,
            css: "marker-restaurant",
            info: info
        });
        var content = getContentRestaurant(info);
        addMarkerWithInfo(RESTAURANT, info, content);
    }

    function showDriverMarker(info) {
        console.log("showing carrier marker");
        info.type = CARRIER;
        var opacity = 1;

        if (info.icon === null || info.icon === undefined) {
            info.waiting = info.status === "Waiting";
            info.shortName = processImageAndName.makeNameSmaller(info.name);

            info.iconContent = Handlebars.compileFromSource($("#template-carrier-marker").html(), info);
        }
        var content = getContentCarrier(info);
        addMarkerWithInfo(CARRIER, info, content);
    }

    function getRestaurantMarkerContent(option) {
        return Handlebars.compile($("#template-restaurant-marker").html())(option);
    }

    function showCustomerMarker(info) {
        console.log("showing customer marker");
        info.type = CUSTOMER;
        console.log(JSON.stringify(info));
        console.log("html " + $("#template-customer-popover").html());

        if (info.icon === null || info.icon === undefined) {
            info.icon = CUSTOMER_IMAGE;
            console.log("1");
        }

        var opacity = 1;
        var css = "marker-customer-assigned";
        info.assigned = true;
        if ((info.orderStatus === "NOT_ASSIGNED" || info.orderStatus === "NOT_STARTED_YET") && !info.scheduled) {
            info.assigned = false;
            css = "marker-customer";
        } else if ((info.orderStatus === "NOT_ASSIGNED" || info.orderStatus === "NOT_STARTED_YET") && info.scheduled) {
            css = "marker-customer-scheduled";
        } else if ((info.orderStatus !== "NOT_ASSIGNED" || info.orderStatus !== "NOT_STARTED_YET") && info.scheduled) {
            css = "marker-customer-assigned-scheduled";
        }
        console.log("2");

        var timeToShow = dateTimeHelper.convertMilisecondsToMinutes(dateTimeHelper.getElapsedTime(info.orderPlacementTime));

        console.log("3");

        if (timeToShow > 90) {
            timeToShow = "90+";
        } else {
            timeToShow = timeToShow + " <small>m</small>";
        }
        console.log("4");

        var deliveryTime = dateTimeHelper.convertToBrowsersDateTime(info.expectedDeliveryDate + ' ' + info.expectedDeliveryTime);
        console.log("5");
        if (info.scheduled === true) {
            timeToShow = dateTimeHelper.getTimeFromDateTimeWithoutPeriod(deliveryTime);
            css = css + ' customer-border';
        }
        console.log("6");
        info.iconContent = processImageAndName.getAvatarImageFromName({
            name: timeToShow,
            "opacity": 1,
            css: css,
            info: info
        });
        console.log("7");

        info.afterPickedUp = orderController.isAfterPickedUp(info.orderStatus);
        info.accepted = orderController.getStatusStage(info.orderStatus) > 1;

        var content = Handlebars.compileFromSource($("#template-customer-popover").html(), info);

        addMarkerWithInfo(CUSTOMER, info, content);
    }

    function zoomIn() {
        mapInstance.setZoom(mapInstance.getZoom() + 1);
    }

    function getZoom() {
        return mapInstance.getZoom();
    }

    function getCenterLatitude() {
        var center = mapInstance.getCenter();
        return center.lat();
    }

    function getCenterLongitude() {
        var center = mapInstance.getCenter();
        return center.lng();
    }

    function zoomOut() {
        mapInstance.setZoom(mapInstance.getZoom() - 1);
    }

    function setZoomLevel(zoomAt) {
        mapInstance.setZoom(zoomAt);
    }

    //info box started
    function contentHeader(name, status) {
        var header = "<h3 class=\"popover-title background-color-black-alfa padding-left-2 padding-right-2\">" + "<span id=\"top-left\" class=\"pull-left\">" + name + "<\/span>" + "<span id=\"top-right\" class=\"pull-right padding-right-5\" style=\"font-size:12px; line-height:16px; font-style:italic;\">" + status + "<\/span>" + "<span>&nbsp;<\/span><\/h3>";
        return header;
    }

    function contentRestaurant(restaurantName) {
        return "<div class=\"restaurant_div\">\n <p class=\"left-icon-keeper background-restaurant\" id=\"restaurant-info\">" + restaurantName + "<\/p>\n<\/div>";
    }

    function contentCustomer(customerName) {
        return "<div class=\"customer_div\">\n <p class=\"left-icon-keeper background-home\" id=\"customer-info\">" + customerName + "<\/p>\n                                  <div class=\"bottom-border-white-A8A9AD margin-left-25\"><\/div>\n <\/div>";
    }

    function contentCarrier(carrierName) {
        return "<div class=\"carrier_div for-top-border-position\">\n <div class=\"bottom-border-white-A8A9AD margin-left-25\"><\/div>\n                                    <p class=\"left-icon-keeper background_car\" id=\"carrier-info\">" + carrierName + "<\/p>\n                                <\/div>";
    }

    function getContentDataCustomer(info) {
        var toReturn = {
            name: '',
            status: '',
            getRestaurant: '',
            getCustomer: '',
            getCarrier: ''
        };
        toReturn.name = info.name;
        var contentCustomerInfo = toReturn.name + "<br>" + info.address;
        toReturn.getCustomer = contentCustomer(contentCustomerInfo);

        var contentRestaurant = info.restaurantName;
        toReturn.getRestaurant = contentRestaurant(contentRestaurant);

        var contentDriver = info.carrierName;
        toReturn.getCarrier = contentCarrier(contentDriver);

        return toReturn;
    }

    function getContentDataCarrier(info) {
        var toReturn = {
            name: '',
            status: '',
            getRestaurant: '',
            getCustomer: '',
            getCarrier: ''
        };

        toReturn.name = info.name;
        var content = info.name;
        if (info.destinationAddress !== undefined) {
            content = toReturn.name + "<br>" + info.destinationAddress;
        }
        toReturn.status = info.status !== undefined ? info.status : '';
        toReturn.getCarrier = contentCarrier(content);
        return toReturn;
    }

    function getContentDataRestaurant(info) {
        var toReturn = {
            name: '',
            status: '',
            getRestaurant: '',
            getCustomer: '',
            getCarrier: ''
        };
        toReturn.name = info.name;
        toReturn.status = info.numberOfOrder;
        var restaurantContent = info.name + "<br>" + info.address;
        toReturn.getRestaurant = contentRestaurant(restaurantContent);

        return toReturn;
    }

    function infoContent(data) {
        return "<div class=\"popover top background-color-black-alfa text-color-E2E2E4-white position-relative radius-0\" style=\"display:block; z-index:-1;width:215px;\">\n" + "<div class=\"arrow\" style=\"border-top-color:rgba(0,0,0,.75);\"><\/div>\n" + contentHeader(data.name, data.status) + "<div class=\"popover-content padding-left-2 padding-right-2\">\n" + data.getCustomer + "\n " + data.getRestaurant + "\n " + data.getCarrier + "<\/div>\n" + "<\/div>";
    }

    function getContentCustomer(info) {}

    function getContentRestaurant(info) {
        var data;
        data = getContentDataRestaurant(info);
        return infoContent(data);
    }

    function getContentCarrier(info) {

        var data;
        data = getContentDataCarrier(info);
        return infoContent(data);
    }

    function addInfoBox(type, info, content) {
        var id = info.id;
        var myOptions = {
            content: content,
            disableAutoPan: false,
            maxWidth: 0,
            alignBottom: true,
            pixelOffset: new google.maps.Size(-105, -40),
            zIndex: null,
            boxStyle: {
                opacity: 0.75,
                width: '210px'
            },
            closeBoxMargin: '2px 2px 2px 2px',
            closeBoxURL: closeImage,
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: 'floatPane',
            enableEventPropagation: false
        };
        allMarkersContainer[type][id].infoBox = {};
        allMarkersContainer[type][id].infoBox = new InfoBox();
        allMarkersContainer[type][id].infoBox.setOptions(myOptions);
    }

    //info box finished

    function addMarkerEvent(type, id) {

        google.maps.event.addListener(allMarkersContainer[type][id].marker, 'click', function () {
            openInfoBox(type, id);
        });

        google.maps.event.addListener(allMarkersContainer[type][id].infoBox, 'closeclick', function () {});
    }

    function closeInfoBox(type, id) {
        allMarkersContainer[type][id].infoBox.close();
    }

    function openInfoBox(type, id) {

        var markers = allMarkersContainer;

        for (var key in markers[type]) {
            if (markers[type].hasOwnProperty(key)) {
                markers[type][key].infoBox.close();
            }
        }
        if (type !== RESTAURANT) {
            markers[type][id].infoBox.open(mapInstance, markers[type][id].marker);
        }
    }

    function addAMarker(type, info) {

        if (allMarkersContainer[type][info.id] === undefined) {
            allMarkersContainer[type][info.id] = [];
        }
        var markerOption = {
            map: mapInstance,
            position: new google.maps.LatLng(info.lat, info.lng),
            anchor: RichMarkerPosition.MIDDLE,
            flat: true,
            content: info.iconContent,
            optimized: false
        };
        if (type === CARRIER) {
            markerOption.zIndex = 99999999;
        }
        var marker = new RichMarker(markerOption);
        allMarkersContainer[type][info.id].marker = marker;
    }

    function saveMarkerInfo(type, info) {
        allMarkersContainer[type][info.id].info = info;
    }

    function hideAllMarkerByType(type) {
        for (var key in allMarkersContainer[type]) {
            if (allMarkersContainer[type].hasOwnProperty(key)) {
                allMarkersContainer[type][key].marker.setMap(null);
                closeInfoBox(type, key);
            }
        }
    }

    function showAllMarkersByType(type) {
        for (var key in allMarkersContainer[type]) {
            if (allMarkersContainer[type].hasOwnProperty(key)) {
                if (allMarkersContainer[type][key].marker.getMap() !== null) {
                    continue;
                }
                allMarkersContainer[type][key].marker.setMap(mapInstance);
            }
        }
    }

    function showOneMarker(type, id) {
        if (allMarkersContainer[type][id].marker.getMap() !== null) {
            return;
        }
        allMarkersContainer[type][id].marker.setMap(mapInstance);
    }

    function hideAllMarker() {
        hideAllMarkerByType(CARRIER);
        hideAllMarkerByType(CUSTOMER);
        hideAllMarkerByType(RESTAURANT);
    }

    function hideOneMarker(type, id) {
        allMarkersContainer[type][id].marker.setMap(null);
        closeInfoBox(type, id);
    }

    function hideAllCarrier() {
        hideAllMarkerByType(CARRIER);
    }

    function hideAllCustomer() {
        hideAllMarkerByType(CUSTOMER);
    }

    function hideAllRestaurant() {
        hideAllMarkerByType(RESTAURANT);
    }

    function showExistedCustomer() {
        showAllMarkersByType(CUSTOMER);
    }

    var administrativeConfig = {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#444444" }]
    };

    var landscapeConfig = {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{ "color": "#f2f2f2" }]
    };

    var poiConfig = {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{ "visibility": "off" }]
    };

    var roadConfig = {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{ "saturation": -100 }, { "lightness": 45 }]
    };

    var highwayConfig = {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [{ "visibility": "simplified" }]
    };

    var arterialConfig = {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [{ "visibility": "off" }]
    };

    var transitConfig = {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{ "visibility": "off" }]
    };

    var waterConfig = {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{ "color": "#46bcec" }, { "visibility": "on" }]
    };

    function getBlueWaterConfig() {
        var config = [administrativeConfig, landscapeConfig, poiConfig, roadConfig, highwayConfig, arterialConfig, transitConfig, waterConfig];
        return config;
    }

    $(document).ready(function () {
        $(document).on('click', '#mapZoomIn', function (e) {
            e.preventDefault();
            zoomIn();
        });

        $(document).on('click', '#mapZoomOut', function () {
            zoomOut();
        });
    });

    exports.initQTMap = initQuestTagMap;
    exports.showActorsOnMap = showActorsOnMap;
})();

},{"./dateTimeHelper":4,"./order.controller":8,"./processImageAndName":9}],8:[function(require,module,exports){
"use strict";

/**
 * Created by Amit on 11/21/2016.
 */
(function () {
    "use strict";

    var dateTimeHelper = require("./dateTimeHelper");
    var utility = require("./utility");
    var dataManager = require("./data.manager");
    var notPickedupYetStatus = ["NOT_ASSIGNED", "NOT_ACCEPTED", "NOT_STARTED_YET", "STARTED"];
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

            if (alert === "PICKUP_ALERT" && value.orderStatus !== "NOT_ASSIGNED") {
                status = "<span class='text-color-orange' >" + status + "</span>";
            } else if (alert === "DELIVERY_ALERT" && value.orderStatus !== "NOT_ASSIGNED") {
                status = "<span class='text-color-brick-red'>" + status + "</span>";
            } else if (value.orderStatus === "NOT_ASSIGNED") status = "<div class='set_middle'><a href='javascript:void(0)' class='btn btn-questtag btn-sm small-text3' style='display: block' title='Assign Order' data-task='assignment' data-refid='" + value.id + "'>" + status + "</a></div>";

            browserPlacementTime = dateTimeHelper.getTimeFromDateTime(dateTimeHelper.convertToBrowsersDateTime(value.orderDateTimeInfo.placementTime));

            elapsedTime = dateTimeHelper.convertMilisecondsToMinutes(dateTimeHelper.getElapsedTime(value.orderDateTimeInfo.placementTime));

            var browserEstimatedDeliveryDateTime = dateTimeHelper.convertToBrowsersDateTime(value.orderDateTimeInfo.expectedDeliveryDate + ' ' + value.orderDateTimeInfo.expectedDeliveryTime);

            browserEstimatedDeliveryTime = dateTimeHelper.getTimeFromDateTime(browserEstimatedDeliveryDateTime);

            var distanceToPickUp = parseFloat(value.distanceBetweenPickUpAndDeliveryLocation).toFixed(2);
            var distanceUnit = getDistanceUnit(distanceToPickUp);
            var timeUnit = getTimeUnit(elapsedTime);
            var totalAmount = adaptOrderTotalAmount(value.costInfo.totalCost);
            var iconAndOrder;
            if (value.scheduled) {
                iconAndOrder = '<span><i class="fa fa-clock-o" aria-hidden="true"></i>' + ' ' + value.orderNumber + '</span>';
            } else if (value.parentId > 0) {
                iconAndOrder = '<span><img width="14" height="14" alt="" src="imgs/redrop.png">' + ' ' + value.orderNumber + '</span>';
            } else {
                iconAndOrder = value.orderNumber;
            }

            var temp = [iconAndOrder, value.customer.name,
            // value.customer.emailAddress,
            value.restaurant.name, totalAmount, distanceToPickUp + ' ' + distanceUnit, browserPlacementTime, browserEstimatedDeliveryTime, elapsedTime + ' ' + timeUnit, getCarrierName(value.assignedCarrier), status, getViewButton(value.id)];
            tableDataSet.push(temp);
        });
        return tableDataSet;
    }

    function alertOrder(order) {
        if ($.inArray(order.orderStatus, notPickedupYetStatus) !== -1) {
            //not yet picked up
            //console.log("not picked up yet");
            if (dateTimeHelper.pickupTimeOk(order.orderDateTimeInfo.expectedDeliveryDate, order.orderDateTimeInfo.expectedPickUpTime) === false) {
                return "PICKUP_ALERT";
            }
        }
        if (order.orderStatus === "PICKED_UP") {
            //console.log("picked up");
            if (dateTimeHelper.deliveryTimeOk(order.orderDateTimeInfo.expectedDeliveryDate, order.orderDateTimeInfo.expectedDeliveryTime) === false) {
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

            if (alert === "PICKUP_ALERT" && value.orderStatus !== "NOT_ASSIGNED") {
                status = "<span class='text-color-orange' >" + status + "</span>";
            } else if (alert === "DELIVERY_ALERT" && value.orderStatus !== "NOT_ASSIGNED") {
                status = "<span class='text-color-brick-red'>" + status + "</span>";
            } else if (value.orderStatus === "NOT_ASSIGNED") status = "<div class='set_middle'><a href='javascript:void(0)' class='btn btn-questtag btn-sm small-text3' style='display: block' title='Assign Order' data-task='assignment' data-refid='" + value.id + "'>" + status + "</a></div>";

            browserPlacementTime = dateTimeHelper.getTimeFromDateTime(dateTimeHelper.convertToBrowsersDateTime(value.orderDateTimeInfo.placementTime));

            elapsedTime = dateTimeHelper.convertMilisecondsToMinutes(dateTimeHelper.getElapsedTime(value.orderDateTimeInfo.placementTime));

            var browserEstimatedDeliveryDateTime = dateTimeHelper.convertToBrowsersDateTime(value.orderDateTimeInfo.expectedDeliveryDate + ' ' + value.orderDateTimeInfo.expectedDeliveryTime);

            browserEstimatedDeliveryTime = dateTimeHelper.getTimeFromDateTime(browserEstimatedDeliveryDateTime);

            var distanceToPickUp = parseFloat(value.distanceBetweenPickUpAndDeliveryLocation).toFixed(2);
            var distanceUnit = getDistanceUnit(distanceToPickUp);
            var timeUnit = getTimeUnit(elapsedTime);
            var totalAmount = adaptOrderTotalAmount(value.costInfo.totalCost);
            var iconAndOrder;
            if (value.scheduled) {
                iconAndOrder = '<span><i class="fa fa-clock-o" aria-hidden="true"></i>' + ' ' + value.orderNumber + '</span>';
            } else if (value.parentId > 0) {
                iconAndOrder = '<span><img width="14" height="14" alt="" src="imgs/redrop.png">' + ' ' + value.orderNumber + '</span>';
            } else {
                iconAndOrder = value.orderNumber;
            }

            var temp = [iconAndOrder, value.customer.name,
            // value.customer.emailAddress,
            value.restaurant.name, totalAmount, distanceToPickUp + ' ' + distanceUnit, browserPlacementTime, browserEstimatedDeliveryTime, elapsedTime + ' ' + timeUnit, getCarrierName(value.assignedCarrier), status, getViewButton(value.id)];
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
            if (dateTimeHelper.pickupTimeOk(order.orderDateTimeInfo.expectedDeliveryDate, order.orderDateTimeInfo.expectedPickUpTime) === false) {
                return "PICKUP_ALERT";
            }
        }
        if (order.orderStatus === "PICKED_UP") {
            //console.log("picked up");
            if (dateTimeHelper.deliveryTimeOk(order.orderDateTimeInfo.expectedDeliveryDate, order.orderDateTimeInfo.expectedDeliveryTime) === false) {
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
        } else {
            return true;
        }
    }

    function getOrderItemLine() {
        var lastRowNum = $('#newOrderForm [data-order-item]').last().attr("data-order-item");
        if (lastRowNum === undefined) {
            lastRowNum = 0;
        }
        var nextRowNo = Number(lastRowNum) + 1;
        var htmlSrc = $("#template-order-item-row").templateify({ number: nextRowNo });
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
            unitPrice: $("[name='item[][unit-price]']").val()
        };

        if (aItem.name === "" && aItem.quantity === "" && aItem.unitPrice === "") {} else {
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
})();

},{"./data.manager":3,"./dateTimeHelper":4,"./utility":12}],9:[function(require,module,exports){
"use strict";

/**
 * Created by Amit on 12/4/2016.
 */

(function () {
    "use strict";

    var TemplateElement = {};
    var avatarContent;
    var imageAvatarContent;
    var avatarLargeContent;
    avatarContent = $("#template-avatar").html();
    imageAvatarContent = $("#image-avatar").html();
    avatarLargeContent = $("#template-avatar-lg").html();

    function getAvatarImageFromName(option) {

        var source = option.big === true ? $("#template-avatar-lg").html() : $("#template-avatar").html();
        if (option.opacity === undefined || option.opacity === null) {
            option.opacity = 1;
        }

        var template = Handlebars.compile(source);

        return template({
            name: option.name,
            opacity: option.opacity,
            bgColor: option.bgColor,
            info: option.info,
            css: option.css
        });
    }

    function treatCarrierName(name) {
        if (name.trim() === "Not Assigned") {
            return name;
        } else return lastNameOneCharacter(name);
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

    function makeNameSmaller(fullName) {
        var toReturn = "";
        var names = fullName.split(" ");
        if (names.length > 1) {
            toReturn += names[0].substring(0, 1);
            toReturn += names[names.length - 1].substring(0, 1);
        } else {
            toReturn = fullName.substring(0, 2);
        }
        return toReturn;
    }

    function getAvatarImageFromFullNameLg(option) {
        var name = makeNameSmaller(option.name);
        return getAvatarImageFromName({
            name: name,
            big: true
        });
    }

    function getAvatarImageFromFullName(option) {
        var name = makeNameSmaller(option.name);
        return getAvatarImageFromName({
            name: name,
            opacity: option.opacity,
            bgColor: option.bgCOlor,
            css: option.css
        });
    }

    function AvatarImageFromImage(option) {
        var source = imageAvatarContent;
        var template = Handlebars.compile(source);
        if (option.opacity === undefined || option.opacity === null) {
            option.opacity = 1;
        }
        return template({
            "image": option.image,
            "opacity": option.opacity,
            cornerCircle: option.cornerCircle
        });
    }

    exports.makeNameSmaller = makeNameSmaller;
    exports.getAvatarImageFromFullNameLg = getAvatarImageFromFullNameLg;
    exports.getAvatarImageFromFullName = getAvatarImageFromFullName;
    exports.AvatarImageFromImage = AvatarImageFromImage;
    exports.getAvatarImageFromName = getAvatarImageFromName;
    exports.treatCarrierName = treatCarrierName;
})();

},{}],10:[function(require,module,exports){
"use strict";

/**
 * Created by Amit on 3/23/2017.
 */

(function () {
    "use strict";

    var dataManager = require('./data.manager');
    var dateTimeHelper = require("./dateTimeHelper");

    var driver = {};
    var sales = {};
    var deliveries = {};
    var services = {};
    driver.string = "Driver Name";
    services.string = "Date";
    deliveries.string = "Date";
    sales.string = "Date";

    driver.chartType = "HORIZONTAL";
    services.chartType = "VERTICAL";
    deliveries.chartType = "VERTICAL";
    sales.chartType = "VERTICAL";

    driver.number = "Driver Earnings";
    services.number = "Avg. Customer Services";
    deliveries.number = "Number of deliveries";
    sales.number = "Total Sales";

    var current = {};
    current = sales;

    // Set a callback to run when the Google Visualization API is loaded.
    // alert("OKay2");
    $(document).ready(function () {
        //setType($("[name='report-type']").val());
        google.charts.load('current', { packages: ['corechart'] });
        google.setOnLoadCallback();

        $(document).on('change', '[name="report-type"]', function () {
            console.log('report changing');

            var report_type = 'driver-payment';
            whatToDraw(report_type);
            refreshGraph();
        });
    });

    function refreshGraph() {

        //var type = ReportPage.getTypeValue();
        //var dateRange = ReportPage.getDateRangeInArray();


        var type = 'driver-payment';
        setType(type);
        var data = {
            type: type,
            //startDate: DateTimeHelper.HReadableToSqlFormat(ReportPage.getDateRangeArrayAuto()[0]),
            //endDate: DateTimeHelper.HReadableToSqlFormat(ReportPage.getDateRangeArrayAuto()[1]),
            //timeZoneOffset: new Date().getTimezoneOffset(),
            option: 'THIS_WEEK'
        };
        drawReportGraph(data);
    }

    function drawReportGraph(output) {

        draw(output.graph_data);
        var reportOption = 'THIS_MONTH';
        var dateRange;

        if (reportOption === 'TODAY' || reportOption === 'YESTERDAY') dateRange = dateTimeHelper.getMonthDateYearWithoutDateFunc(output.start_date);else dateRange = dateTimeHelper.getMonthDateYearWithoutDateFunc(output.start_date) + " to " + dateTimeHelper.getMonthDateYearWithoutDateFunc(output.end_date);

        setDateRange(dateRange);
    }

    function setDateRange(dateRange) {
        $("#text-date-range").html(dateRange);
    }

    function whatToDraw(type) {

        setType(type);
        draw();
    }

    function setType(type) {
        switch (type) {
            case 'driver-payment':
                current = driver;
                break;
            case 'sales-report':
                current = sales;
                break;

            case 'customer-service':
                current = services;
                break;
            case 'deliveries':
                current = deliveries;
                break;
        }
    }

    function draw(onlineData) {

        var data = new google.visualization.DataTable();
        data.addColumn('string', current.string);
        data.addColumn('number', current.number);

        data.addRows(objectToArray(onlineData));

        var graphHeight = '';
        var fontSizeBarChart = 0;
        var barWidth = 0;
        var length = objectToArray(onlineData).length;

        if (length >= 40) {
            graphHeight = '100%';
            fontSizeBarChart = 10;
            barWidth = 100;
            $('#graph-report').height(800);
        } else if (length >= 30) {
            graphHeight = 700;
            fontSizeBarChart = 12;
            barWidth = 100;
            $('#graph-report').height(700);
        } else if (length >= 20) {
            graphHeight = 600;
            fontSizeBarChart = 13;
            barWidth = 100;
            $('#graph-report').height(600);
        } else if (length >= 10) {
            graphHeight = 500;
            fontSizeBarChart = 14;
            barWidth = 75;
            $('#graph-report').height(500);
        } else if (length < 10 && length >= 5) {
            graphHeight = 400;
            fontSizeBarChart = 15;
            barWidth = 40;
            $('#graph-report').height(400);
        } else {
            graphHeight = 400;
            fontSizeBarChart = 15;
            barWidth = 10;
            $('#graph-report').height(400);
        }

        // Set chart options
        var options = {
            'width': '100%',
            'height': graphHeight,
            'colors': ['#ADB9C2'],
            vAxis: {
                textStyle: {
                    fontSize: fontSizeBarChart // or the number you want
                }

            },
            hAxis: {
                textStyle: {
                    fontSize: fontSizeBarChart + 1 // or the number you want
                }

            },
            bar: { groupWidth: barWidth + '%' }

        };

        var options2 = {
            'width': '100%',
            'height': '100%',
            'colors': ['#ADB9C2']
        };

        // Instantiate and draw our chart, passing in some options.
        var chart;

        if (current.chartType === "HORIZONTAL") {
            $('#graph-report2').hide();
            $('#graph-report').show();
            chart = new google.visualization.BarChart(document.getElementById('graph-report'));

            chart.draw(data, options);
        } else {
            $('#graph-report2').show();
            $('#graph-report').hide();
            chart = new google.visualization.ColumnChart(document.getElementById('graph-report2'));

            chart.draw(data, options2);
        }
    }

    function objectToArray(data) {
        if (data === undefined) {
            return [];
        }
        var returnArray = [];
        $.each(data, function (key, value) {

            var subName = key.split("-");

            if (subName.length > 2) {
                var monthDayYear = dateTimeHelper.getMonthDateYearWithoutDateFunc(key);
                returnArray.push([monthDayYear, value]);
            } else {
                if (parseFloat(value) > 0) {
                    returnArray.push([key, value]);
                }
            }
        });

        return returnArray;
    }

    exports.whatToDraw = whatToDraw;
})();

},{"./data.manager":3,"./dateTimeHelper":4}],11:[function(require,module,exports){
"use strict";

/**
 * Created by User on 10/23/2016.
 */

(function () {
    "use strict";

    function SettingsElement() {}

    var settingDiv = "#settings";
    var smsSendingInput = "#settings [name='sms-setting']";
    var emailSendingInput = "#settings [name='email-setting']";
    SettingsElement.bussinessTypeInput = "#settings [name='bussiness-type']";
    var deleiveryTypeInput = "#settings [name='delivery-type']";
    SettingsElement.inputForOnlyDeliveryDiv = "#settings #only-on-deliveryOnly";
    SettingsElement.inputForOnDemadDiv = "#settings #only-onDemand";
    SettingsElement.businessName = '#settings [name="business-name"]';
    SettingsElement.contactPhone = '#settings [name="contact-phone"]';
    SettingsElement.pickupLocation = '#settings [name="pickup-location"]';
    SettingsElement.maxTimeLimit = '#settings [name="max-time-limit"]';
    SettingsElement.latitudeText = '#settings [name="lat"]';
    SettingsElement.longitudeText = '#settings [name="lng"]';
    SettingsElement.zoomLevelText = '#settings [name="zoom-level"]';
    SettingsElement.autoDispatchingInput = '#settings [name="auto-dispatching"]';
    SettingsElement.checkGeofenceInput = '#settings [name="check-geofence"]';
    SettingsElement.maxOrderResponseTime = '#settings [name="order-respose-time"]';
    SettingsElement.scheduleOrderLeadTimeInSeconds = '#settings [name="scheduled-order-lead-time"]';
    SettingsElement.fixedDriverFeePerDelivery = '#settings [name="fixed-driver-fee-per-delivery"]';
    SettingsElement.geofenceRadius = '#settings [name="geofence-radius"]';
    SettingsElement.containerOnlyForGeofence = "#settings #only-onGeofence";
    SettingsElement.timeZoneSelector = '#time-zone-offset';

    function BusinessModel() {}

    BusinessModel.DELIVERY_ONLY = 'Delivery only';
    BusinessModel.PICKUP_N_DELIVERY = 'Pickup and Delivery';

    function SettingsController() {}

    SettingsController.businessTypeSelected = function () {

        if (SettingsController.isOnlyDelivery()) {
            $(SettingsElement.inputForOnlyDeliveryDiv).show();
        } else {

            $(SettingsElement.inputForOnlyDeliveryDiv).hide();
        }
    };

    SettingsController.isOnlyDelivery = function () {
        return $(SettingsElement.bussinessTypeInput + '[value="' + BusinessModel.DELIVERY_ONLY + '"]').prop("checked");
    };

    SettingsController.showSettings = function () {
        console.log("show settings function");
        SettingsController.businessTypeSelected();
    };

    function businessTypeChangeEvent() {
        $(SettingsElement.bussinessTypeInput).change(function () {
            console.log("change business type");
            SettingsController.businessTypeSelected();
        });
    }

    exports.showSettings = SettingsController.showSettings;
    exports.businessTypeChangeEvent = businessTypeChangeEvent;
})();

},{}],12:[function(require,module,exports){
'use strict';

/**
 * Created by Amit on 11/22/2016.
 */
(function () {
    "use strict";

    function domCreator(tag, attribute) {
        var newDom = document.createElement(tag);
        $.each(attribute, function (key, val) {
            newDom.setAttribute(key, val);
        });
        return newDom;
    }

    function createDiv(_class, id, attributes) {
        var optionsAttr = {};
        if (attributes !== undefined) {
            $.each(attributes, function (key, val) {
                optionsAttr[key] = val;
            });
        }
        optionsAttr.class = _class;
        optionsAttr.id = id;
        return domCreator('div', optionsAttr);
    }

    function createImg(src, width, height, _class, id) {
        return domCreator('img', {
            'class': _class,
            id: id,
            src: src,
            width: width,
            height: height
        });
    }

    function correctPhoneFormat(phoneNo) {
        var newPhoneNo = phoneNo;
        if (phoneNo === undefined) {
            return phoneNo;
        }
        newPhoneNo = phoneNo.replace(" ", "");
        newPhoneNo = newPhoneNo.trim();
        if (newPhoneNo.length !== 10) {
            return phoneNo;
        }

        newPhoneNo = newPhoneNo.slice(0, 3) + " " + newPhoneNo.slice(3, 6) + " " + newPhoneNo.slice(6, 10);
        return newPhoneNo;
    }

    function adaptOrderCostInput(input) {
        if (input < 0) {
            return 'N/A';
        } else {
            input = parseFloat(input).toFixed(2);
            return '$' + '' + input;
        }
    }

    exports.correctPhoneFormat = correctPhoneFormat;
    exports.adaptOrderCostInput = adaptOrderCostInput;
    exports.createDiv = createDiv;
})();

},{}],13:[function(require,module,exports){
'use strict';

/**
 * Created by kawnayeen on 10/19/16.
 */
(function () {
    "use strict";

    var dataManager;
    var currency_symbol = '$';
    var currency_code = 'USD';
    var driverViewGenerator = require("./driver.view.generator");
    var settingsViewGenerator = require("./settings.controller");
    var billingViewGenerator = require("./billing.controller");
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
        var dataToShow = '';
        $("#dashboardDiv").putTemplate("#template-settings-info", dataToShow);
        $("#settingsDiv").outerHeight($("#settingsDiv").height() + 60 + 'px');
        settingsViewGenerator.showSettings();
    }

    function loadBillingInfo() {
        var dataToShow = dataManager.getBillingInfo();
        $("#dashboardDiv").putTemplate("#template-billing-and-payment", dataToShow);
        var position = $("#dashboardDiv").offset();
        $('#menuDivDropdown2').css('min-height', screen.height - position.top);
        billingViewGenerator.generateBillingTable();
    }

    function loadOrder() {
        console.log("order");
        var dataToShow = '';
        $("#dashboardDiv").putTemplate("#template-order-info", dataToShow);
        $('.orderButtonsContainer a').removeClass('active');
        $('#activeOrder').addClass('active');
        $(".has-order-table").hide();
        $(".active-order-wrapper").show();
        orderViewGenerator.generateActiveOrderTable(dataManager.getActiveOrdersData());
    }

    function loadScheduledOrder() {
        console.log("scheduled");
        $('.orderButtonsContainer a').removeClass('active');
        $('#scheduledOrder').addClass('active');
        $(".has-order-table").hide();
        $(".incomplete-order-wrapper").show();
        orderViewGenerator.generateFutureOrderTable(dataManager.getFutureOrdersData());
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
        var adaptedDataForNotAcceptedOrder = adaptingDashboardOrderDataUnassigned(dataManager.getActiveOrdersData());
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
        var dataToShow = dataManager.getBillingInfo();
        $("#dashboardDiv").putTemplate("#template-report", '');
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
    }

    exports.loadView = loadView;
    exports.initialize = initialize;
})();

},{"./billing.controller":2,"./dateTimeHelper":4,"./driver.view.generator":5,"./map.controller":7,"./order.controller":8,"./report.controller":10,"./settings.controller":11}]},{},[1]);
