/**
 * Created by kawnayeen on 7/2/17.
 */
"use strict";

export default class InitialDataLoader {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.driverDataPath = 'resources/driverdata.json';
        this.settingsDataPath = 'resources/settingsdata.json';
        this.activeOrdersPath = 'resources/activeorders.json';
        this.futureOrdersPath = 'resources/futureorders.json';
        this.driverPaymentPath = 'resources/driverpayment.json';
        this.markerPointsPath = 'resources/markerpoints.json';
        this.billingInfoPath = 'resources/billingInfos.json';
        this.driverPaymentReportPath = 'resources/driverPaymentReport.json';
        this.orderDetailsPath = 'resources/orderDetailsInfo.json';
    }

    loadInitialData() {
        $.get(this.driverDataPath, data => this.dataManager.setDriverList(data));
        $.get(this.settingsDataPath, data => this.dataManager.setSettingsData(data));
        $.get(this.activeOrdersPath, data => this.dataManager.setActiveOrderData(data));
        $.get(this.futureOrdersPath, data => this.dataManager.setFutureOrderData(data));
        $.get(this.driverPaymentPath, data => this.dataManager.setDriverPaymentList(data));
        $.get(this.markerPointsPath, data => this.dataManager.setActorPointsData(data));
        $.get(this.billingInfoPath, data => this.dataManager.setBillingInfo(data));
        $.get(this.driverPaymentReportPath, data => this.dataManager.setDriverPaymentReport(data));
        $.get(this.orderDetailsPath, data => this.dataManager.setOrderDetails(data));
    }
}