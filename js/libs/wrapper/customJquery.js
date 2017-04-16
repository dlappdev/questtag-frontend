$.fn.requiredOk = function () {

    var toReturn = true;
    $(this).find('[required]').each(function () {
        if (toReturn == false) {
            return false;
        }
        var self = $(this);
        var checked = (self.is(':checkbox') || self.is(':radio'))
            ? self.is(':not(:checked)') && $('input[name=' + self.attr('name') + ']:checked').length === 0
            : false;

        if (self.val() === '' || checked) {
            toReturn = false;
        }
    });
    return toReturn;
};

$.fn.templateify = function (data) {
    var source = $(this).html();
    var template = Handlebars.compile(source);
    return template(data);
};

$.fn.putTemplate = function (sourceElement, data) {
    var compiledTemplate = $(sourceElement).templateify(data);
    $(this).html(compiledTemplate);
};

$.fn.appendTemplate = function (sourceElement, data) {
    var compiledTemplate = $(sourceElement).templateify(data);
    $(this).append(compiledTemplate);
};


$.ajax_download = function (url, data) {
    var $iframe,
        iframe_doc,
        iframe_html;


    if (($iframe = $('#download_iframe')).length === 0) {
        $iframe = $("<iframe id='download_iframe'" +
            " style='display: none' src='about:blank'></iframe>"
        ).appendTo("body");
    }

    iframe_doc = $iframe[0].contentWindow || $iframe[0].contentDocument;
    if (iframe_doc.document) {
        iframe_doc = iframe_doc.document;
    }

    iframe_html = "<html><head></head><body><form method='POST' action='" +
        url + "'>"

    Object.keys(data).forEach(function (key) {
        iframe_html += "<input type='hidden' name='" + key + "' value='" + data[key].replace("'", "\&apos;").replace("\"", "\&quot;") + "'>";


    });

    iframe_html += "</form></body></html>";
    iframe_doc.open();
    iframe_doc.write(iframe_html);
    $(iframe_doc).find('form').submit();
};


jQuery.each(["put", "delete"], function (i, method) {
    jQuery[method] = function (url, data, callback, type) {
        if (jQuery.isFunction(data)) {
            type = type || callback;
            callback = data;
            data = undefined;
        }

        return jQuery.ajax({
            url: url,
            type: method,
            dataType: type,
            data: data,
            success: callback
        });
    };
});


$.fn.submitAjax = function (functionSuccess, functionError, functionAlways) {
    var thisElement = this;
    $(this).submit(function (e) {
        e.preventDefault();
        console.log(this);
        var $submitButton = $(this).find('[type="submit"]');
        var submitButtonContent = $submitButton.html();
        var method = $(this).attr('method');
        var data = {};
        var contentType = null;
        var action = $(this).attr('action');
        if (action == undefined) {
            return;
        }
        if (method == undefined) {
            method = "get";
        }
        $submitButton.html('<i class="fa fa-spinner fa-pulse"></i>');
        $submitButton.prop('disabled', true);
        if ($(this).attr('enctype') === "multipart/form-data") {
            data = new FormData($(this)[0]);
            contentType = false;
        } else {
            data = $(this).serialize();
            contentType = "application/x-www-form-urlencoded; charset=UTF-8";
        }

        $.ajax({
            url: action,
            type: method,
            data: data,
            async: true,
            cache: false,
            contentType: contentType,
            processData: false,
            success: function (data, textStatus, jqXHR) {
                functionSuccess.call(thisElement, data, textStatus, jqXHR);
                var reset = $(this).attr('data-reset') == 'auto' ? true : false;
                if (reset) {
                    $(thisElement)[0].reset();
                }
                alertInfo('Carrier Insertion', data.response);
            }
        }).fail(function (jqXHR, textStatus) {
            console.log(jqXHR);
            if ($.isFunction(functionError)) {
                functionError.call(thisElement, jqXHR, textStatus);
            }
        }).always(function () {
            console.log("always");
            $submitButton.html(submitButtonContent);
            $submitButton.prop('disabled', false);
            if ($.isFunction(functionAlways)) {
                functionAlways.call(thisElement);
            }

        });
    });
};
