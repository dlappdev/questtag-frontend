/**
 * Created by Amit on 3/23/2017.
 */
(function () {
    "use strict";

    var dateTimeHelper = require("./dateTimeHelper");
    var driver = {};
    var sales = {};
    var deliveries = {};
    var services = {};

    driver.string = "Driver Name";
    driver.chartType = "HORIZONTAL";
    driver.number = "Driver Earnings";

    services.string = "Date";
    services.chartType = "VERTICAL";
    services.number = "Avg. Customer Services";

    deliveries.string = "Date";
    deliveries.chartType = "VERTICAL";
    deliveries.number = "Number of deliveries";

    sales.string = "Date";
    sales.chartType = "VERTICAL";
    sales.number = "Total Sales";

    var current = {};
    current = sales;

    $(document).ready(function () {
        google.charts.load('current', {packages: ['corechart']});
        google.setOnLoadCallback();

        $(document).on('change', '[name="report-type"]', function () {
            console.log('report changing');
            var report_type = 'driver-payment';
            whatToDraw(report_type);
            refreshGraph();
        });
    });

    function refreshGraph() {
        var type = 'driver-payment';
        setType(type);
        var data = {
            type: type,
            option: 'THIS_WEEK'
        };
        drawReportGraph(data);
    }

    function drawReportGraph(output) {
        draw(output.graph_data);
        var reportOption = 'THIS_MONTH';
        var dateRange;
        if (reportOption === 'TODAY' || reportOption === 'YESTERDAY')
            dateRange = dateTimeHelper.getMonthDateYearWithoutDateFunc(output.start_date);
        else
            dateRange = dateTimeHelper.getMonthDateYearWithoutDateFunc(output.start_date) + " to " + dateTimeHelper.getMonthDateYearWithoutDateFunc(output.end_date);

        setDateRange(dateRange);
    }

    function setDateRange(dateRange) {
        $("#text-date-range").html(dateRange);
    }

    function whatToDraw(type) {
        setType(type);
        draw();
    }

    function setType(type) {
        switch (type) {
            case 'driver-payment':
                current = driver;
                break;
            case 'sales-report':
                current = sales;
                break;

            case 'customer-service':
                current = services;
                break;
            case 'deliveries':
                current = deliveries;
                break;
        }
    }

    function draw(onlineData) {
        var data = new google.visualization.DataTable();
        data.addColumn('string', current.string);
        data.addColumn('number', current.number);
        data.addRows(objectToArray(onlineData));

        var graphHeight = '';
        var fontSizeBarChart = 0;
        var barWidth = 0;
        var length = objectToArray(onlineData).length;

        if (length >= 40) {
            graphHeight = '100%';
            fontSizeBarChart = 10;
            barWidth = 100;
            $('#graph-report').height(800);
        }
        else if (length >= 30) {
            graphHeight = 700;
            fontSizeBarChart = 12;
            barWidth = 100;
            $('#graph-report').height(700);
        }

        else if (length >= 20) {
            graphHeight = 600;
            fontSizeBarChart = 13;
            barWidth = 100;
            $('#graph-report').height(600);

        }
        else if (length >= 10) {
            graphHeight = 500;
            fontSizeBarChart = 14;
            barWidth = 75;
            $('#graph-report').height(500);

        }
        else if (length < 10 && length >= 5) {
            graphHeight = 400;
            fontSizeBarChart = 15;
            barWidth = 40;
            $('#graph-report').height(400);
        }
        else {
            graphHeight = 400;
            fontSizeBarChart = 15;
            barWidth = 10;
            $('#graph-report').height(400);
        }

        // Set chart options
        var options = {
            'width': '100%',
            'height': graphHeight,
            'colors': ['#ADB9C2'],
            vAxis: {
                textStyle: {
                    fontSize: fontSizeBarChart // or the number you want
                }
            },
            hAxis: {
                textStyle: {
                    fontSize: fontSizeBarChart + 1 // or the number you want
                }
            },
            bar: {groupWidth: barWidth + '%'}
        };

        var options2 = {
            'width': '100%',
            'height': '100%',
            'colors': ['#ADB9C2']
        };

        // Instantiate and draw our chart, passing in some options.
        var chart;
        if (current.chartType === "HORIZONTAL") {
            $('#graph-report2').hide();
            $('#graph-report').show();
            chart = new google.visualization.BarChart(document.getElementById('graph-report'));
            chart.draw(data, options);
        } else {
            $('#graph-report2').show();
            $('#graph-report').hide();
            chart = new google.visualization.ColumnChart(document.getElementById('graph-report2'));
            chart.draw(data, options2);
        }
    }

    function objectToArray(data) {
        if (data === undefined) {
            return [];
        }
        var returnArray = [];
        $.each(data, function (key, value) {
            var subName = key.split("-");
            if (subName.length > 2) {
                var monthDayYear = dateTimeHelper.getMonthDateYearWithoutDateFunc(key);
                returnArray.push([monthDayYear, value]);
            }
            else {
                if (parseFloat(value) > 0) {
                    returnArray.push([key, value]);

                }
            }
        });
        return returnArray;
    }

    exports.whatToDraw = whatToDraw;
}());

