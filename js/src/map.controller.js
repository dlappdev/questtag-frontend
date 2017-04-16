/**
 * Created by Amit on 11/28/2016.
 */
(function () {
    "use strict";
    var processImageAndName = require('./processImageAndName');
    var orderController = require('./order.controller');
    var dateTimeHelper = require('./dateTimeHelper');

    var latitude = 0;
    var longitude = 0;
    var mapId = 'map_div';
    var mapInstance = null;
    var CARRIER = 'carriers';
    var CUSTOMER = 'customers';
    var RESTAURANT = 'restaurants';
    var allMarkersContainer = {};
    var allCarrierActors = [];
    var allCustomerActors = [];
    var allRestaurantActors = [];
    var carrierMarkerTemplate = $("#template-carrier-marker").html();
    var restaurantMarker = null;
    var closeImage = 'imgs/close.png';
    var RESTAURANT_IMAGE = 'imgs/map/restaurant.png';
    var CUSTOMER_IMAGE = 'imgs/map/home.png';


    function initQuestTagMap(lat, lng) {
        console.log("in map function");
        allMarkersContainer[CARRIER] = {};
        allMarkersContainer[CUSTOMER] = {};
        allMarkersContainer[RESTAURANT] = {};


        latitude = lat;
        longitude = lng;
        var geographicPoint = new google.maps.LatLng(latitude, longitude);

        var mapOptions = {
            center: geographicPoint,
            zoom: 12,
            disableDefaultUI: true,
            styles: getBlueWaterConfig(),
            disableDoubleClickZoom: true
        };
        mapInstance = new google.maps.Map(document.getElementById(mapId), mapOptions);

    }

    function showActorsOnMap(output) {
        processActorsInfo(output);
        setAllMarkers();
    }

    function addMarkerWithInfo(type, info, content) {
        info.lat = info.latitude;
        info.lng = info.longitude;
        addAMarker(type, info);
        addInfoBox(type, info, content);
        addMarkerEvent(type, info.id);
        saveMarkerInfo(type, info);

    }


    function setAllMarkers() {
        showAllDriverMarkers(allCarrierActors);
        showAllRestaurantMarkers(allRestaurantActors);
        showAllCustomerMarkers(allCustomerActors);

    }

    function processActorsInfo(output) {
        if (output.success === 'true') {
            allCarrierActors = output.carrier_actors;
            allCustomerActors = output.customer_actors;
            allRestaurantActors = output.restaurant_actors;
            return true;
        } else {
            return false;
        }
    }

    function showAllDriverMarkers(carrierList) {
        for (var key in carrierList) {
            if (carrierList.hasOwnProperty(key)) {
                showDriverMarker(carrierList[key]);
            }
        }
    }

    function showAllCustomerMarkers(customerList) {

        for (var key in customerList) {
            if (customerList.hasOwnProperty(key)) {
                showCustomerMarker(customerList[key]);
            }
        }
    }

    function showAllRestaurantMarkers(restaurantList) {

        for (var key in restaurantList) {
            if (restaurantList.hasOwnProperty(key)) {
                showRestaurantMarker(restaurantList[key]);
            }
        }
    }


    function showRestaurantMarker(info) {
        console.log("showing restaurant marker");
        info.type = RESTAURANT;
        info.toolTip = true;

        if (info.icon === null || info.icon === undefined) {
            info.icon = RESTAURANT_IMAGE;

        }
        var opacity = 1;

        info.iconContent = getRestaurantMarkerContent({
            name: info.numberOfOrder,
            "opacity": opacity,
            css: "marker-restaurant",
            info: info
        });
        var content = getContentRestaurant(info);
        addMarkerWithInfo(RESTAURANT, info, content);

    }

    function showDriverMarker(info) {
        console.log("showing carrier marker");
        info.type = CARRIER;
        var opacity = 1;

        if (info.icon === null || info.icon === undefined) {
            info.waiting = info.status === "Waiting";
            info.shortName = processImageAndName.makeNameSmaller(info.name);

            info.iconContent = Handlebars.compileFromSource($("#template-carrier-marker").html(), info);

        }
        var content = getContentCarrier(info);
        addMarkerWithInfo(CARRIER, info, content);

    }

    function getRestaurantMarkerContent(option) {
        return Handlebars.compile($("#template-restaurant-marker").html())(option);
    }

    function showCustomerMarker(info) {
        console.log("showing customer marker");
        info.type = CUSTOMER;
        console.log(JSON.stringify(info));
        console.log("html " + $("#template-customer-popover").html());


        if (info.icon === null || info.icon === undefined) {
            info.icon = CUSTOMER_IMAGE;
            console.log("1");
        }

        var opacity = 1;
        var css = "marker-customer-assigned";
        info.assigned = true;
        if ((info.orderStatus === "NOT_ASSIGNED" || info.orderStatus === "NOT_STARTED_YET") && !info.scheduled) {
            info.assigned = false;
            css = "marker-customer";
        }
        else if ((info.orderStatus === "NOT_ASSIGNED" || info.orderStatus === "NOT_STARTED_YET") && info.scheduled) {
            css = "marker-customer-scheduled";
        }
        else if ((info.orderStatus !== "NOT_ASSIGNED" || info.orderStatus !== "NOT_STARTED_YET") && info.scheduled) {
            css = "marker-customer-assigned-scheduled";
        }
        console.log("2");


        var timeToShow = dateTimeHelper.convertMilisecondsToMinutes(
            dateTimeHelper.getElapsedTime(info.orderPlacementTime)
        );

        console.log("3");

        if (timeToShow > 90) {
            timeToShow = "90+";
        } else {
            timeToShow = timeToShow + " <small>m</small>";
        }
        console.log("4");


        var deliveryTime =
            dateTimeHelper.convertToBrowsersDateTime(info.expectedDeliveryDate + ' ' +
                info.expectedDeliveryTime);
        console.log("5");
        if (info.scheduled === true) {
            timeToShow = dateTimeHelper.getTimeFromDateTimeWithoutPeriod(deliveryTime);
            css = css + ' customer-border';
        }
        console.log("6");
        info.iconContent = processImageAndName.getAvatarImageFromName({
            name: timeToShow,
            "opacity": 1,
            css: css,
            info: info
        });
        console.log("7");

        info.afterPickedUp = orderController.isAfterPickedUp(info.orderStatus);
        info.accepted = orderController.getStatusStage(info.orderStatus) > 1;


        var content = Handlebars.compileFromSource($("#template-customer-popover").html(), info);


        addMarkerWithInfo(CUSTOMER, info, content);
    }


    function zoomIn() {
        mapInstance.setZoom(mapInstance.getZoom() + 1);
    }

    function getZoom() {
        return mapInstance.getZoom();
    }

    function getCenterLatitude() {
        var center = mapInstance.getCenter();
        return center.lat();
    }

    function getCenterLongitude() {
        var center = mapInstance.getCenter();
        return center.lng();
    }

    function zoomOut() {
        mapInstance.setZoom(mapInstance.getZoom() - 1);
    }

    function setZoomLevel(zoomAt) {
        mapInstance.setZoom(zoomAt);
    }

    //info box started
    function contentHeader(name, status) {
        var header = "<h3 class=\"popover-title background-color-black-alfa padding-left-2 padding-right-2\">" +
            "<span id=\"top-left\" class=\"pull-left\">" +
            name +
            "<\/span>" +
            "<span id=\"top-right\" class=\"pull-right padding-right-5\" style=\"font-size:12px; line-height:16px; font-style:italic;\">" +
            status +
            "<\/span>" +
            "<span>&nbsp;<\/span><\/h3>";
        return header;
    }

    function contentRestaurant(restaurantName) {
        return "<div class=\"restaurant_div\">\n <p class=\"left-icon-keeper background-restaurant\" id=\"restaurant-info\">" + restaurantName + "<\/p>\n<\/div>";
    }

    function contentCustomer(customerName) {
        return "<div class=\"customer_div\">\n <p class=\"left-icon-keeper background-home\" id=\"customer-info\">" + customerName + "<\/p>\n                                  <div class=\"bottom-border-white-A8A9AD margin-left-25\"><\/div>\n <\/div>";
    }

    function contentCarrier(carrierName) {
        return "<div class=\"carrier_div for-top-border-position\">\n <div class=\"bottom-border-white-A8A9AD margin-left-25\"><\/div>\n                                    <p class=\"left-icon-keeper background_car\" id=\"carrier-info\">" + carrierName + "<\/p>\n                                <\/div>";
    }

    function getContentDataCustomer(info) {
        var toReturn = {
            name: '',
            status: '',
            getRestaurant: '',
            getCustomer: '',
            getCarrier: ''
        };
        toReturn.name = info.name;
        var contentCustomerInfo = toReturn.name + "<br>" + info.address;
        toReturn.getCustomer = contentCustomer(contentCustomerInfo);

        var contentRestaurant = info.restaurantName;
        toReturn.getRestaurant = contentRestaurant(contentRestaurant);

        var contentDriver = info.carrierName;
        toReturn.getCarrier = contentCarrier(contentDriver);

        return toReturn;

    }

    function getContentDataCarrier(info) {
        var toReturn = {
            name: '',
            status: '',
            getRestaurant: '',
            getCustomer: '',
            getCarrier: ''
        };


        toReturn.name = info.name;
        var content = info.name;
        if (info.destinationAddress !== undefined) {
            content = toReturn.name + "<br>" + info.destinationAddress;
        }
        toReturn.status = info.status !== undefined ? info.status : '';
        toReturn.getCarrier = contentCarrier(content);
        return toReturn;
    }

    function getContentDataRestaurant(info) {
        var toReturn = {
            name: '',
            status: '',
            getRestaurant: '',
            getCustomer: '',
            getCarrier: ''
        };
        toReturn.name = info.name;
        toReturn.status = info.numberOfOrder;
        var restaurantContent = info.name + "<br>" + info.address;
        toReturn.getRestaurant = contentRestaurant(restaurantContent);

        return toReturn;
    }

    function infoContent(data) {
        return "<div class=\"popover top background-color-black-alfa text-color-E2E2E4-white position-relative radius-0\" style=\"display:block; z-index:-1;width:215px;\">\n" +
            "<div class=\"arrow\" style=\"border-top-color:rgba(0,0,0,.75);\"><\/div>\n" +
            contentHeader(data.name, data.status) +
            "<div class=\"popover-content padding-left-2 padding-right-2\">\n" +
            data.getCustomer + "\n " +
            data.getRestaurant + "\n " +
            data.getCarrier +
            "<\/div>\n" +
            "<\/div>";
    }

    function getContentCustomer(info) {


    }

    function getContentRestaurant(info) {
        var data;
        data = getContentDataRestaurant(info);
        return infoContent(data);
    }


    function getContentCarrier(info) {

        var data;
        data = getContentDataCarrier(info);
        return infoContent(data);

    }


    function addInfoBox(type, info, content) {
        var id = info.id;
        var myOptions = {
            content: content,
            disableAutoPan: false,
            maxWidth: 0,
            alignBottom: true,
            pixelOffset: new google.maps.Size(-105, -40),
            zIndex: null,
            boxStyle: {
                opacity: 0.75,
                width: '210px'
            },
            closeBoxMargin: '2px 2px 2px 2px',
            closeBoxURL: closeImage,
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: 'floatPane',
            enableEventPropagation: false
        };
        allMarkersContainer[type][id].infoBox = {};
        allMarkersContainer[type][id].infoBox = new InfoBox();
        allMarkersContainer[type][id].infoBox.setOptions(myOptions);
    }

    //info box finished

    function addMarkerEvent(type, id) {

        google.maps.event.addListener(allMarkersContainer[type][id].marker, 'click', function () {
            openInfoBox(type, id);
        });

        google.maps.event.addListener(allMarkersContainer[type][id].infoBox, 'closeclick', function () {

        });
    }

    function closeInfoBox(type, id) {
        allMarkersContainer[type][id].infoBox.close();
    }

    function openInfoBox(type, id) {

        var markers = allMarkersContainer;

        for (var key in markers[type]) {
            if (markers[type].hasOwnProperty(key)) {
                markers[type][key].infoBox.close();
            }
        }
        if (type !== RESTAURANT) {
            markers[type][id].infoBox.open(mapInstance, markers[type][id].marker);
        }
    }

    function addAMarker(type, info) {

        if (allMarkersContainer[type][info.id] === undefined) {
            allMarkersContainer[type][info.id] = [];
        }
        var markerOption = {
            map: mapInstance,
            position: new google.maps.LatLng(info.lat, info.lng),
            anchor: RichMarkerPosition.MIDDLE,
            flat: true,
            content: info.iconContent,
            optimized: false
        };
        if (type === CARRIER) {
            markerOption.zIndex = 99999999;
        }
        var marker = new RichMarker(markerOption);
        allMarkersContainer[type][info.id].marker = marker;
    }

    function saveMarkerInfo(type, info) {
        allMarkersContainer[type][info.id].info = info;
    }


    function hideAllMarkerByType(type) {
        for (var key in allMarkersContainer[type]) {
            if (allMarkersContainer[type].hasOwnProperty(key)) {
                allMarkersContainer[type][key].marker.setMap(null);
                closeInfoBox(type, key);
            }
        }
    }

    function showAllMarkersByType(type) {
        for (var key in allMarkersContainer[type]) {
            if (allMarkersContainer[type].hasOwnProperty(key)) {
                if (allMarkersContainer[type][key].marker.getMap() !== null) {
                    continue;
                }
                allMarkersContainer[type][key].marker.setMap(mapInstance);
            }
        }
    }

    function showOneMarker(type, id) {
        if (allMarkersContainer[type][id].marker.getMap() !== null) {
            return;
        }
        allMarkersContainer[type][id].marker.setMap(mapInstance);
    }

    function hideAllMarker() {
        hideAllMarkerByType(CARRIER);
        hideAllMarkerByType(CUSTOMER);
        hideAllMarkerByType(RESTAURANT);
    }

    function hideOneMarker(type, id) {
        allMarkersContainer[type][id].marker.setMap(null);
        closeInfoBox(type, id);
    }

    function hideAllCarrier() {
        hideAllMarkerByType(CARRIER);
    }

    function hideAllCustomer() {
        hideAllMarkerByType(CUSTOMER);
    }

    function hideAllRestaurant() {
        hideAllMarkerByType(RESTAURANT);
    }

    function showExistedCustomer() {
        showAllMarkersByType(CUSTOMER);
    }


    var administrativeConfig = {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#444444"}]
    };

    var landscapeConfig = {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {"color": "#f2f2f2"}
        ]
    };

    var poiConfig = {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {"visibility": "off"}
        ]
    };

    var roadConfig = {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {"saturation": -100},
            {"lightness": 45}
        ]
    };

    var highwayConfig = {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {"visibility": "simplified"}
        ]
    };

    var arterialConfig = {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {"visibility": "off"}
        ]
    };

    var transitConfig = {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {"visibility": "off"}
        ]
    };

    var waterConfig = {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {"color": "#46bcec"},
            {"visibility": "on"}
        ]
    };

    function getBlueWaterConfig() {
        var config = [
            administrativeConfig,
            landscapeConfig,
            poiConfig,
            roadConfig,
            highwayConfig,
            arterialConfig,
            transitConfig,
            waterConfig
        ];
        return config;
    }


    $(document).ready(function () {
        $(document).on('click', '#mapZoomIn', function (e) {
            e.preventDefault();
            zoomIn();
        });

        $(document).on('click', '#mapZoomOut', function () {
            zoomOut();
        });
    });

    exports.initQTMap = initQuestTagMap;
    exports.showActorsOnMap = showActorsOnMap;
}());