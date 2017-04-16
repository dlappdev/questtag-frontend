/* global Handlebars, DateTimeHelper */
var MILISECONDS_TO_MINUTE = 60000;
var A_M = 'a.m.';
var P_M = 'p.m.';
Handlebars.make = function (component, value) {
    var source = $(component).html();
    var template = Handlebars.compile(source);
    return template(value);
};

Handlebars.compileFromSource = function (source, data) {
    var template = Handlebars.compile(source);
    return template(data);
};

Handlebars.registerHelper('x', function (lvalue, rvalue) {
    return lvalue * rvalue;
});

Handlebars.registerHelper('money', function (value) {

    var amount = adaptOrderCostInput(value);
    return new Handlebars.SafeString(amount);
});

Handlebars.registerHelper('equal', function (lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if (lvalue != rvalue) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

Handlebars.registerHelper('gt', function (lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if (lvalue <= rvalue) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

Handlebars.registerHelper('dateTime', function (dateStr) {
    if (dateStr == "null" || dateStr == null) {
        return "N/A";
    }
    return getDateAndTimeFromDateTime(
        convertToBrowsersDateTime(dateStr)
    );
});

Handlebars.registerHelper('feedback', function (feedback) {
    return JsonOutputAdapter.adaptOrderFeedbackData(feedback);
});
Handlebars.registerHelper('eachGlobal', function (context, options) {
    context = eval(context);
    console.log(context);
    var ret = "";
    for (var i = 0, j = context.length; i < j; i++) {
        ret = ret + options.fn(context[i]);
    }
    return ret;
});

Handlebars.registerHelper('format3decimal', function (numberStr) {
    return parseFloat(numberStr).toFixed(3);
});

Handlebars.registerHelper('format2decimal', function (numberStr) {
    console.log(numberStr);
    //return Dispatcher.currency_symbol+parseFloat(numberStr).toFixed(2);
    return '$' + parseFloat(numberStr).toFixed(2);

});


Handlebars.registerHelper('eval', function (str) {
    return eval(str);
});

Handlebars.registerHelper('func', function (func, param) {
    return eval(func + "('" + param + "')");
});


Handlebars.registerHelper('vehicle', function (type) {
    return JsonOutputAdapter.getVehicle(type)
});

Handlebars.registerHelper('diffDate', function (date1, date2) {
    if (date1 == null || date1 == "null" || date2 == null || date2 == "null") {
        return null;
    }
    var jsDate1 = convertToBrowsersDateTime(date1);
    var jsDate2 = convertToBrowsersDateTime(date2);
    return dateDiff(jsDate1, jsDate2);
});


Handlebars.registerHelper('_toSpace', function (data) {
    return data.replace("_", " ");
});
Handlebars.registerHelper('parse', function (context) {
    if (context === null)
        return JSON.parse('""');
    else if (context.length < 1)
        return JSON.parse('""');

    else if (context.length > 0)
        return JSON.parse(context);
});

Handlebars.registerHelper('notnull', function (v1) {
    if (v1 === "null") {
        return "null";
    }
    return "notnull";
});

Handlebars.registerHelper('shortDateformat', function (v1) {
    var year = v1.substring(0, 4);
    var month = v1.substring(5, 7);
    var date = v1.substring(8, 10);
    var d = new Date(v1);
    return ( month +
    "/" + date +
    "/" + year);
});


/////////// Helping function /////////////
function adaptOrderCostInput(input) {
    if (input < 0) {
        return 'N/A';
    } else {
        input = parseFloat(input).toFixed(2);
        return '$ ' + input;
    }
}
function convertToBrowsersDateTime(tempDateTime) {
    var browserdateLocal;
    if (tempDateTime.indexOf('T') > 0) {
        browserdateLocal = new Date(tempDateTime);
    } else {
        var serverDateUTC = tempDateTime.replace(/-/g, '/');
        serverDateUTC = serverDateUTC + ' UTC';
        browserdateLocal = new Date(serverDateUTC);
    }

    return browserdateLocal;
}


function dateDiff(d1, d2) {
    var timeDiff;
    if (d1 > d2)
        timeDiff = d1 - d2;
    else
        timeDiff = d2 - d1;


    var diffs = {
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
    };

    for (var key in diffs) {
        if (diffs.hasOwnProperty(key)) {
            diffs[key] = Math.floor(timeDiff / timeInMiilis[key]);
            timeDiff -= diffs[key] * timeInMiilis[key];
        }
    }

    return diffs;
}

function getDateAndTimeFromDateTime(dateTime) {
    var date = getDateFromDateTime(dateTime);
    var time = getTimeFromDateTime(dateTime);
    var readableLocalTime = date + "&nbsp;&nbsp;   " + time;
    return readableLocalTime;
}

function getDateFromDateTime(tempDateTime) {
    var tempYears = tempDateTime.getFullYear();
    var tempMonths = tempDateTime.getMonth() + 1;
    var tempDate = tempDateTime.getDate();
    var monthName = getMonthFromNumber(tempMonths);
    if (tempDate < 10) {
        tempDate = '0' + tempDate;
    }
    var tempTime = monthName + ' ' + tempDate + ', ' + tempYears;
    return tempTime;
}

function getStatusStage(status) {
    return $.inArray(status, ALL_STATUSES);
}
var ALL_STATUSES = [];
ALL_STATUSES[0] = 'NOT_ASSIGNED';
ALL_STATUSES[1] = 'NOT_ACCEPTED';
ALL_STATUSES[2] = 'NOT_STARTED_YET';
ALL_STATUSES[3] = 'STARTED';
ALL_STATUSES[4] = 'PICKED_UP';
ALL_STATUSES[5] = 'READY_TO_DELIVER';
ALL_STATUSES[6] = 'ALREADY_DELIVERED';

function getMonthFromNumber(month) {
    switch (month) {
        case 1:
            return 'Jan';
        case 2:
            return 'Feb';
        case 3:
            return 'Mar';
        case 4:
            return 'Apr';
        case 5:
            return 'May';
        case 6:
            return 'Jun';
        case 7:
            return 'Jul';
        case 8:
            return 'Aug';
        case 9:
            return 'Sep';
        case 10:
            return 'Oct';
        case 11:
            return 'Nov';
        case 12:
            return 'Dec';
    }
}

function getTimeFromDateTime(tempDateTime) {
    var tempHours = tempDateTime.getHours();
    var tempMinutes = tempDateTime.getMinutes();
    var periodicHours, period;
    if (tempHours >= 12) {
        period = P_M;
    } else {
        period = A_M;
    }
    periodicHours = tempHours % 12;
    if (periodicHours === 0) {
        periodicHours = 12;
    }
    if (tempMinutes < 10) {
        tempMinutes = '0' + tempMinutes;
    }
    var tempTime = periodicHours + ':' + tempMinutes + ' ' + period;
    return tempTime;
}