/**
 * Created by Amit on 1/21/2017.
 */
(function () {
    "use strict";

    function compressAndMapAdded() {

    }

    $(document).ready(function () {
        $(document).on('click', "#expand-compress-icon", function (e) {
            e.preventDefault();
            console.log("clicking expand button");

        });
    });
    exports.compressAndMapAdded = compressAndMapAdded;
}());