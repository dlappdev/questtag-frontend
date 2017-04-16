/**
 * Created by User on 10/23/2016.
 */

(function () {
    "use strict";

    function SettingsElement() {

    }

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


    function BusinessModel() {
    }

    BusinessModel.DELIVERY_ONLY = 'Delivery only';
    BusinessModel.PICKUP_N_DELIVERY = 'Pickup and Delivery';

    function SettingsController() {

    }

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
}());