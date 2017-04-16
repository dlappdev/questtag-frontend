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
}());