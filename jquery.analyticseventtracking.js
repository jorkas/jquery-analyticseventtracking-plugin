/*jslint browser: true, undef: true, nomen: true, eqeqeq: true, bitwise: false,
         newcap: true, immed: true, white: false, plusplus: false */
/*global jQuery, console, _gaq */

/**
 * @author Joakim Westerlund
 * @author Sven Strittmatter <weltraumschaf@gmail.com>
 * @version 1.0 (2011-05-21)
 * @link https://github.com/jorkas/jquery-analyticseventtracking-plugin
 */
(function($) {
    var globalOptions = {
        category: "jaet-report-category",
        action:   "jaet-report-action",
        label:    "jaet-report-label",
        value:    "jaet-report-value"
    },
    methods = {
        init: function(settings) {
            $(document).on('click', this.selector, function(event) {
                if (settings.delayed === true && $(this).attr("href")) {
                    event.preventDefault();
                }
                methods.trackEvent.call($(this), settings);
            });
        },
        getData: function(name, elm, defaultData) {
            var $elm = $(elm), data;
            data = $elm.data(name) || $elm.attr("data-" + name);
            return data || defaultData;
        },
        getEventValue: function(value, elm) {
            if ($.isFunction(value)) {
                return value.call(elm);
            } else {
                return value;
            }
        },
        reportCategory: function() {
            return methods.getData(globalOptions.category, this, "DefaultCategory");
        },
        reportAction: function() {
            return methods.getData(globalOptions.action, this, "DefaultAction");
        },
        reportLabel: function() {
            return methods.getData(globalOptions.label, this, "DefaultLabel");
        },
        reportValue: function() {
            var value = methods.getData(globalOptions.value, this, 0);
            return parseInt(value, 10) || 0;
        },
        trackEvent: function() {
            var settings = arguments[0],
                $this    = $(this),
                tracking = {
                    eventCategory: methods.getEventValue(settings.category, this),
                    eventAction:   methods.getEventValue(settings.action, this),
                    eventLabel:    methods.getEventValue(settings.label, this),
                    eventValue:    methods.getEventValue(settings.value, this)
                },
                errorMsg;

            if (typeof(_gaq) !== "undefined") {
                _gaq.push([
                    settings.trackerName,
                    tracking.eventCategory,
                    tracking.eventAction,
                    tracking.eventLabel,
                    tracking.eventValue
                    ]);
            } else {
                errorMsg = "Google Analaytics _gaq varible not found! Please set up Google Analytics properly.";
                if (console && console.error && typeof console.error === "function") {
                    console.error(errorMsg);
                } else {
                    throw errorMsg;
                }
            }
            if (settings.delayed === true && $this.attr("href")) {
                setTimeout(function() {
                    document.location = $this.attr("href");
                    }, 100);
                }
            }
        };

        $.analyticsEventTracking = function(options) {
            globalOptions = $.extend(globalOptions, options || {});
        };

        /**
        * Default plugin options.
        *
        * @var {Object}
        */
        $.analyticsEventTracking.defaultOptions = {
            category:    methods.reportCategory,
            action:      methods.reportAction,
            label:       methods.reportLabel,
            value:       methods.reportValue,
            trackerName: '_trackEvent', //Default to Analytics default
            delayed:     true //Delay link clicks for some miliseconds
        };

        /**
        * Binds the elements of the wrapped set to click events for tracking.
        *
        * @param {Object} Optional tracking options.
        * @return {jQuery}
        */
        $.fn.analyticsEventTracking = function(options) {
            var settings = $.extend({},$.analyticsEventTracking.defaultOptions, options || {});
            methods.init.call(this, settings);
            return this;
        };

        /**
        * Triggers event tracking for all elements in the wrapped set
        * @param {Object} Optional tracking options.
        * @return {jQuery}
        */
        $.fn.analyticsTrackEvent = function(options) {
            var settings = $.extend({},$.analyticsEventTracking.defaultOptions, options || {});
            this.each(function(){
                methods.trackEvent.call($(this), settings);
            });
            return this;
        };
})(jQuery);
