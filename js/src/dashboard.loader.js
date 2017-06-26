/**
 * Created by kawnayeen on 6/26/17.
 */
export default class DashboardLoader {
    constructor(qtController, bodyNode) {
        this.qtController = qtController;
        this.bodyNode = bodyNode;
        this.dashboardContainerContent = "views/dbContainer.html";
        this.contentUris = [
            "views/map.html",
            "views/avatarImageTemplate.html",
            "views/dashboard.html",
            "views/accountInfo.html",
            "views/billingInfo.html",
            "views/driverInfo.html",
            "views/settingsInfo.html",
            "views/report.html",
            "views/order.html",
            "views/propicChange.html",
            "views/passwordChange.html",
            "views/locationChange.html",
            "views/orderItemRow.html",
            "views/orderDetail.html",
            "views/dashboardOrderRow.html"
        ];
    }

    loadDashboard() {
        this.contentUris.forEach(uri => this.fetchAndAppendContent(uri));
    }

    fetchAndAppendContent(fetchUri) {
        $.get(fetchUri, data => this.bodyNode.append(data));
    }
}