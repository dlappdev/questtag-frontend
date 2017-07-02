/**
 * Created by Amit on 12/4/2016.
 */
(function () {
    "use strict";

    let imageAvatarContent = $("#image-avatar").html();

    function getAvatarImageFromName(option) {
        var source = option.big === true ? $("#template-avatar-lg").html() : $("#template-avatar").html();
        if (option.opacity === undefined || option.opacity === null) {
            option.opacity = 1;
        }
        var template = Handlebars.compile(source);
        return template({
            name: option.name,
            opacity: option.opacity,
            bgColor: option.bgColor,
            info: option.info,
            css: option.css
        });
    }

    function treatCarrierName(name) {
        if (name.trim() === "Not Assigned") {
            return name;
        } else
            return lastNameOneCharacter(name);
    }

    function lastNameOneCharacter(fullName) {
        var toReturn = "";
        var names = fullName.split(" ");
        if (names.length > 1) {
            toReturn += names[0] + " ";
            toReturn += names[names.length - 1].substring(0, 1) + ".";
        } else {
            toReturn = fullName;
        }
        return toReturn;
    }

    function makeNameSmaller(fullName) {
        var toReturn = "";
        var names = fullName.split(" ");
        if (names.length > 1) {
            toReturn += names[0].substring(0, 1);
            toReturn += names[names.length - 1].substring(0, 1);
        } else {
            toReturn = fullName.substring(0, 2);
        }
        return toReturn;
    }


    function getAvatarImageFromFullNameLg(option) {
        var name = makeNameSmaller(option.name);
        return getAvatarImageFromName({
            name: name,
            big: true
        });
    }

    function getAvatarImageFromFullName(option) {
        var name = makeNameSmaller(option.name);
        return getAvatarImageFromName({
            name: name,
            opacity: option.opacity,
            bgColor: option.bgCOlor,
            css: option.css
        });
    }

    function AvatarImageFromImage(option) {
        var source = imageAvatarContent;
        var template = Handlebars.compile(source);
        if (option.opacity === undefined || option.opacity === null) {
            option.opacity = 1;
        }
        return template({
            "image": option.image,
            "opacity": option.opacity,
            cornerCircle: option.cornerCircle
        });
    }

    exports.makeNameSmaller = makeNameSmaller;
    exports.getAvatarImageFromFullNameLg = getAvatarImageFromFullNameLg;
    exports.getAvatarImageFromFullName = getAvatarImageFromFullName;
    exports.AvatarImageFromImage = AvatarImageFromImage;
    exports.getAvatarImageFromName = getAvatarImageFromName;
    exports.treatCarrierName = treatCarrierName;
}());