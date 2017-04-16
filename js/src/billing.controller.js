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
}());
