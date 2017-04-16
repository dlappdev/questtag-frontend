/**
 *
 */
(function () {
    "use strict";

    var MILISECONDS_TO_MINUTE = 60000;
    var A_M = 'a.m.';
    var P_M = 'p.m.';

    var timeInMiilis = {
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
    };
    timeInMiilis.second = 1000;
    timeInMiilis.minute = timeInMiilis.second * 60;
    timeInMiilis.hour = timeInMiilis.minute * 60;
    timeInMiilis.day = timeInMiilis.hour * 24;
    timeInMiilis.month = timeInMiilis.day * 30;
    timeInMiilis.year = timeInMiilis.day * 365;

    function formatTimeInDashbord(dateTime) {
        var toretun = dateTime;
        var date = getMonthDateFromDateTime(dateTime);
        var time = getTimeFromDateTime(dateTime);
        return date + "&nbsp;   " + time;
    }


    function getTodayYearMonthData() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        mm = mm < 10 ? "0" + mm : mm;
        dd = dd < 10 ? "0" + dd : dd;
        var yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    }

    function addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }

    function getTimeHourMinute(date) {
        var hour = date.getHours();
        var minute = date.getMinutes();
        var meridiem;


        if (hour > 12) {
            hour -= 12;
            meridiem = "PM";
        } else if (hour === 12) {
            meridiem = "PM";
        }
        else {
            meridiem = "AM";
        }

        hour = hour < 10 ? "0" + hour : hour;
        minute = minute < 10 ? "0" + minute : minute;

        return hour + ":" + minute + " " + meridiem;
    }


    function getTimeForTimePicker(offsetMinute) {
        var theTime = addMinutes(new Date(), offsetMinute);
        return getTimeHourMinute(theTime);
    }

    function getDateForTableFilterMonthDateYear(date) {
        var yyyy = date.getFullYear();
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        dd = dd < 10 ? "0" + dd : dd;
        var monthName = getMonthFromNumber(mm);

        return monthName + " " + dd + ", " + yyyy;
    }

    function getDateForTableFilterToday() {
        return getDateForTableFilterMonthDateYear(new Date());
    }

    function getDateForTableFilterTomorrow() {
        var date = new Date();
        date.setDate(date.getDate() + 1);
        return getDateForTableFilterMonthDateYear(date);
    }

    function getDateForTableFilterYesterday() {
        var date = new Date();
        date.setDate(date.getDate() - 1);
        return getDateForTableFilterMonthDateYear(date);
    }


    function getThisWeekRange() {
        var date = new Date();
        var returnDate = [];
        var dayNo = date.getDay();
        var init = dayNo;
        //alert("dasdd");
        var offsetDate = new Date();
        offsetDate.setDate(date.getDate() - init);
        returnDate[0] = getDateForTableFilterMonthDateYear(offsetDate);

        offsetDate = new Date();
        offsetDate.setDate(date.getDate() - init + 6);
        returnDate[1] = getDateForTableFilterMonthDateYear(offsetDate);
        return returnDate;
    }

    function getThisMonthRange() {
        var date1 = new Date();
        date1.setDate(1);

        var date2 = new Date();
        date2.setMonth(date2.getMonth() + 1);
        date2.setDate(0);
        return [
            getDateForTableFilterMonthDateYear(date1),
            getDateForTableFilterMonthDateYear(date2)
        ];
    }

    function getDateForTableFilterThisWeek() {
        var date = new Date();
        var returnStr = "";
        var dayNo = date.getDay();
        var init = dayNo;
        //alert("dasdd");
        for (var i = 0; i <= 6; i++) {
            var offsetDate = new Date();
            offsetDate.setDate(offsetDate.getDate() + (i - init));
            returnStr += getDateForTableFilterMonthDateYear(offsetDate) + "|";
        }
        returnStr = returnStr.substr(0, returnStr.length - 1);
        return returnStr;
    }

    function extractDateTimeFrom(tempDateTime) {
        var tempYears = tempDateTime.year;
        var tempMonths = tempDateTime.monthOfYear;
        var tempDate = tempDateTime.dayOfMonth;
        var tempHours = tempDateTime.hourOfDay;
        var tempMinutes = tempDateTime.minuteOfHour;
        var tempSeconds = tempDateTime.secondOfMinute;
        if (tempMonths < 10) {
            tempMonths = '0' + tempMonths;
        }
        if (tempDate < 10) {
            tempDate = '0' + tempDate;
        }
        if (tempHours < 10) {
            tempHours = '0' + tempHours;
        }
        if (tempMinutes < 10) {
            tempMinutes = '0' + tempMinutes;
        }
        if (tempSeconds < 10) {
            tempSeconds = '0' + tempSeconds;
        }
        var ConvertableDateTime = tempYears + '-' + tempMonths + '-' + tempDate + ' ' + tempHours + ':' + tempMinutes + ':' + tempSeconds;
        return ConvertableDateTime;
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

    function convertDateTimeToJsDate(date, time) {
        return convertToBrowsersDateTime(date + " " + time);
    }

    function pickupTimeOk(date, time) {
        var pickupDateTime = convertDateTimeToJsDate(date, time).getTime() + 5 * 60 * 1000;
        var currentTime = new Date().getTime();
        if (currentTime > pickupDateTime) {
            return false;
        }
        return true;
    }

    function deliveryTimeOk(date, time, timeNeededToReach) {
        var deliveryDateTime = convertDateTimeToJsDate(date, time).getTime();
        var currentTime = new Date().getTime();
        timeNeededToReach = 20 * 60 * 1000;
        if (currentTime + 5 * 60 * 1000 + timeNeededToReach > deliveryDateTime) {
            return false;
        }
        return true;
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

    function getTimeFromDateTimeWithoutPeriod(tempDateTime) {
        var tempHours = tempDateTime.getHours();
        var tempMinutes = tempDateTime.getMinutes();
        if (tempMinutes < 10) {
            tempMinutes = '0' + tempMinutes;
        }

        var tempTime = tempHours + ':' + tempMinutes;
        return tempTime;
    }

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

    function getMonthDateFromDateTime(tempDateTime) {
        var tempMonths = tempDateTime.getMonth() + 1;
        var tempDate = tempDateTime.getDate();
        var monthName = getMonthFromNumber(tempMonths);
        if (tempDate < 10) {
            tempDate = '0' + tempDate;
        }
        var tempTime = monthName + ' ' + tempDate + ',';
        return tempTime;
    }

    function getReadableFormatFromDateTime(tempDateTime) {
        var tempYears = tempDateTime.getFullYear();
        var tempMonths = tempDateTime.getMonth() + 1;
        var tempDate = tempDateTime.getDate();
        var tempHours = tempDateTime.getHours();
        var tempMinutes = tempDateTime.getMinutes();
        var tempSeconds = tempDateTime.getSeconds();
        if (tempMonths < 10) {
            tempMonths = '0' + tempMonths;
        }
        if (tempDate < 10) {
            tempDate = '0' + tempDate;
        }
        if (tempHours < 10) {
            tempHours = '0' + tempHours;
        }
        if (tempMinutes < 10) {
            tempMinutes = '0' + tempMinutes;
        }
        if (tempSeconds < 10) {
            tempSeconds = '0' + tempSeconds;
        }
        var ReadableDateTime = tempDate + '-' + tempMonths + '-' + tempYears + ' ' + tempHours + ':' + tempMinutes + ':' + tempSeconds;

        return ReadableDateTime;
    }

    function getDuration(startDateTime, endDateTime) {
        var tempDuration = endDateTime.getTime() - startDateTime.getTime();
        return tempDuration;
    }

    function convertMilisecondsToMinutes(tempMiliseconds) {
        var tempMinutes = Math.round(tempMiliseconds / MILISECONDS_TO_MINUTE);
        return tempMinutes;
    }

    function getElapsedTime(placementTime) {
        var browserPlacementTime = convertToBrowsersDateTime(placementTime);
        var currentDateTime = new Date();
        var tempTimeElapsed = getDuration(browserPlacementTime, currentDateTime);
        return tempTimeElapsed;
    }

    function getDeliveryTime(placementTime, deliveryTime) {
        var browserPlacementTime = convertToBrowsersDateTime(placementTime);
        var browserdeliveryTime = convertToBrowsersDateTime(deliveryTime);
        var tempTimeElapsed = getDuration(browserPlacementTime, browserdeliveryTime);
        return tempTimeElapsed;
    }

    function covertTo24HourFormat(tempTime) {
        var convertedTime, finalHours;
        var hours = parseInt(tempTime.substring(0, tempTime.indexOf(':')));
        if (tempTime.indexOf('PM') > 0) {
            if (hours !== 12) {
                convertedTime = hours + 12 + ':' + tempTime.substring(tempTime.indexOf(':') + 1, tempTime.indexOf('P') - 1) + ':' + '00';
            } else {
                convertedTime = hours + ':' + tempTime.substring(tempTime.indexOf(':') + 1, tempTime.indexOf('P') - 1) + ':' + '00';

            }
        } else {
            if (hours !== 12) {
                if (hours < 10) {
                    convertedTime = '0' + hours + ':' + tempTime.substring(tempTime.indexOf(':') + 1, tempTime.indexOf('A') - 1) + ':' + '00';
                } else {
                    convertedTime = hours + ':' + tempTime.substring(tempTime.indexOf(':') + 1, tempTime.indexOf('A') - 1) + ':' + '00';
                }

            } else {
                convertedTime = '00' + ':' + tempTime.substring(tempTime.indexOf(':') + 1, tempTime.indexOf('A') - 1) + ':' + '00';
            }
        }
        return convertedTime;
    }

    function convertToUTCDateTime(tempDateTime) {
        var date = new Date(tempDateTime);
        var date2 = new Date(
            date.getTime() +
            (new Date().getTimezoneOffset() * 60000)
        );
        return date2.toUTCString();
    }

    function getMonthNumber(month) {
        switch (month) {
            case 'Jan':
                return 1;
            case 'Feb':
                return 2;
            case 'Mar':
                return 3;
            case 'Apr':
                return 4;
            case 'May':
                return 5;
            case 'Jun':
                return 6;
            case 'Jul':
                return 7;
            case 'Aug':
                return 8;
            case 'Sep':
                return 9;
            case 'Oct':
                return 10;
            case 'Nov':
                return 11;
            case 'Dec':
                return 12;
        }
    }


    function HReadableToSqlFormat(tempDate) {

        var date = tempDate.substring(4, 6);
        var monthInWord = tempDate.substring(0, 3);
        var month;
        var year = tempDate.substring(8);
        var monthInNumber = getMonthNumber(monthInWord);
        if (monthInNumber < 10) {
            month = '0' + monthInNumber;
        } else {
            month = monthInNumber;
        }
        var formatedDate = year + '-' + month + '-' + date;
        return formatedDate;
    }

    function convertToSqlDateFormat(tempDate) {
        //input format : Tue, 11 Aug 2015
        var month;
        var date = tempDate.substring(5, 7);
        var monthInWord = tempDate.substring(8, 11);
        var year = tempDate.substring(12);
        var monthInNumber = getMonthNumber(monthInWord);
        if (monthInNumber < 10) {
            month = '0' + monthInNumber;
        } else {
            month = monthInNumber;
        }
        var formatedDate = year + '-' + month + '-' + date;
        return formatedDate;
    }

    function getBrowserTimeZoneOffset() {
        var timeZoneOffsetInMinute = new Date().getTimezoneOffset();
        var timezoneOffsetInHMS;
        if (timeZoneOffsetInMinute < 0) {
            timezoneOffsetInHMS = getHourMinuteSecondFromSeconds(timeZoneOffsetInMinute * -1 * 60);
            return "+" + timezoneOffsetInHMS;
        } else {
            timezoneOffsetInHMS = getHourMinuteSecondFromSeconds(timeZoneOffsetInMinute * 60);
            return "-" + timezoneOffsetInHMS;
        }
    }

    function getHourMinuteSecondFromSeconds(totalSeconds) {
        var hours = Math.floor(totalSeconds / (60 * 60));

        var divisorForMinutes = totalSeconds % (60 * 60);
        var minutes = Math.floor(divisorForMinutes / 60);

        var divisorForSeconds = divisorForMinutes % 60;
        var seconds = Math.ceil(divisorForSeconds);

        if (hours < 10) {
            hours = '0' + hours;
        }

        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        return hours + ':' + minutes + ':' + seconds;
    }

    function getDateAndTimeFromDateTime(dateTime) {
        var date = getDateFromDateTime(dateTime);
        var time = getTimeFromDateTime(dateTime);
        var readableLocalTime = date + "&nbsp;&nbsp;   " + time;
        return readableLocalTime;
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


    function getMonthDateYearWithoutDateFunc(tempDate) {

        var d = tempDate.split(/[\/\-\.\T]/, 3);
        var monthName = getMonthFromNumber(parseInt(d[1]));
        return monthName + " " + d[2] + ", " + d[0];
    }

    exports.pickupTimeOk = pickupTimeOk;
    exports.getTimeHourMinute = getTimeHourMinute;
    exports.getDateForTableFilterToday = getDateForTableFilterToday;
    exports.getDateForTableFilterTomorrow = getDateForTableFilterTomorrow;
    exports.getDateForTableFilterYesterday = getDateForTableFilterYesterday;
    exports.getThisWeekRange = getThisWeekRange;
    exports.getTodayYearMonthData = getTodayYearMonthData;
    exports.getThisMonthRange = getThisMonthRange;
    exports.getDateForTableFilterThisWeek = getDateForTableFilterThisWeek;
    exports.getTimeForTimePicker = getTimeForTimePicker;
    exports.getReadableFormatFromDateTime = getReadableFormatFromDateTime;
    exports.extractDateTimeFrom = extractDateTimeFrom;
    exports.deliveryTimeOk = deliveryTimeOk;
    exports.getTimeFromDateTimeWithoutPeriod = getTimeFromDateTimeWithoutPeriod;
    exports.getDeliveryTime = getDeliveryTime;
    exports.covertTo24HourFormat = covertTo24HourFormat;
    exports.convertToUTCDateTime = convertToUTCDateTime;
    exports.HReadableToSqlFormat = HReadableToSqlFormat;
    exports.convertToSqlDateFormat = convertToSqlDateFormat;
    exports.getBrowserTimeZoneOffset = getBrowserTimeZoneOffset;
    exports.getHourMinuteSecondFromSeconds = getHourMinuteSecondFromSeconds;
    exports.getDateAndTimeFromDateTime = getDateAndTimeFromDateTime;
    exports.getDateFromDateTime = getDateFromDateTime;
    exports.dateDiff = dateDiff;
    exports.getMonthDateYearWithoutDateFunc = getMonthDateYearWithoutDateFunc;
    exports.getMonthDateFromDateTime = getMonthDateFromDateTime;
    exports.getDateForTableFilterMonthDateYear = getDateForTableFilterMonthDateYear;
    exports.convertDateTimeToJsDate = convertDateTimeToJsDate;
    exports.formatTimeInDashbord = formatTimeInDashbord;
    exports.getDuration = getDuration;
    exports.getElapsedTime = getElapsedTime;
    exports.convertToBrowsersDateTime = convertToBrowsersDateTime;
    exports.getMonthDateYearWithoutDateFunc = getMonthDateYearWithoutDateFunc;
    exports.getMonthDateYearWithoutDateFunc = getMonthDateYearWithoutDateFunc;
    exports.getTimeFromDateTime = getTimeFromDateTime;
    exports.convertMilisecondsToMinutes = convertMilisecondsToMinutes;
    exports.getMonthFromNumber = getMonthFromNumber;
    exports.getMonthNumber = getMonthNumber;
    exports.addMinutes = addMinutes;
}());