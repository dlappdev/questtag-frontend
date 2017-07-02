/**
 * Created by User on 10/23/2016.
 */
"use strict";

export default class SettingsController {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.deliveryOnlyNode = '#settings #only-on-deliveryOnly';
        this.templateId = '#template-settings-info';
    }

    showSettings() {
        let settingsData = this.dataManager.getSettingsData();
        $("#dashboardDiv").putTemplate(this.templateId, '');
        $("#settingsDiv").outerHeight($("#settingsDiv").height() + 60 + 'px');
        if (settingsData["onlyDeliveryTypeOn"] === true) {
            $(this.deliveryOnlyNode).show();
        } else {
            $(this.deliveryOnlyNode).hide();
        }
    }
}