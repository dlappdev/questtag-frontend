/**
 * Created by kawnayeen on 10/19/16.
 */
"use strict";

export default class DataManager {
    constructor() {
        this.billingInfo = [];
        this.driverPaymentReport = [];
        this.orderDetailsInfo = [];
        this.driverList = [];
        this.driverPaymentList = [];
        this.settingsData = [];
        this.activeOrdersData = [];
        this.futureOrdersData = [];
        this.actorPoints = [];
    }

    getBillingInfo() {
        return this.billingInfo;
    }

    setBillingInfo(billingInfo) {
        this.billingInfo = billingInfo;
    }

    getOrderDetails() {
        return this.orderDetailsInfo;
    }

    setOrderDetails(orderDetails) {
        this.orderDetailsInfo = orderDetails;
    }

    getDriverList() {
        return this.driverList;
    }

    setDriverList(driverList) {
        this.driverList = driverList;
    }

    getDriverPaymentList() {
        return this.driverPaymentList;
    }

    setDriverPaymentList(driverPaymentList) {
        this.driverPaymentList = driverPaymentList;
    }

    getDriverPaymentReport() {
        return this.driverPaymentReport;
    }

    setDriverPaymentReport(driverPaymentReport) {
        this.driverPaymentReport = driverPaymentReport;
    }

    getSettingsData() {
        return this.settingsData;
    }

    setSettingsData(settingsData) {
        this.settingsData = settingsData;
    }

    getActiveOrderData() {
        return this.activeOrdersData;
    }

    setActiveOrderData(activeOrderData) {
        this.activeOrdersData = activeOrderData;
    }

    getFutureOrderData() {
        return this.futureOrdersData;
    }

    setFutureOrderData(futureOrderData) {
        this.futureOrdersData = futureOrderData;
    }

    getActorPointsData() {
        return this.actorPoints;
    }

    setActorPointsData(actorPoints) {
        this.actorPoints = actorPoints;
    }
}