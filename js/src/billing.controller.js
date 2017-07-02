/**
 * Created by Amit  on 11/15/16.
 */
"use strict";

export default class BillingController {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.nodeId = '#billingTable';
        this.templateId = '#template-billing-and-payment';
    }

    showBillingTable() {
        let billingData = this.dataManager.getBillingInfo();
        $("#dashboardDiv").putTemplate(this.templateId, billingData);
        let position = $("#dashboardDiv").offset();
        $('#menuDivDropdown2').css('min-height', screen.height - position.top);
        $(this.nodeId).DataTable({
            "paging": false,
            "ordering": false,
            "info": false,
            "searching": false
        });
    }
}
