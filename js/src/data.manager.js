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

}());