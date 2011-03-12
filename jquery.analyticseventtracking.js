/**
 * @author Joakim Westerlund
 */
(function( $ ){
    var encodeString = function(str){
        return encodeURI(str);
    };
    var methods = {
        init: function(settings){
            this.each(function(){
                $(this).click(function(event){
                    if(settings.delayed === true && $(this).attr("href")){
                        event.preventDefault();
                    }
                    return methods.trackEvent.call($(this),settings,event);
                });
            });
        },
        getEventValue: function(value,elm){
            if($.isFunction(value)){
                return value.call(elm);
            }else{
                return value;
            }
        },
        reportCategory: function(){
            return $(this).data("report-category") ? $(this).data("report-category") : "DefaultCategory";
        },
        reportAction: function(){
            return $(this).data("report-action") ? $(this).data("report-action") : "DefaultAction";
        },
        reportLabel: function(){
            return $(this).data("report-label") ? $(this).data("report-label") : "";
        },
        reportValue: function(){
            return $(this).data("report-value") ? $(this).data("report-value") : 0;
        },
        trackEvent: function(){
            var settings = arguments[0];
            var elm = $(this);
            var tracking = {
                eventCategory: methods.getEventValue(settings.category, this),
                eventAction: methods.getEventValue(settings.action, this),
                eventLabel: methods.getEventValue(settings.label, this),
                eventValue: methods.getEventValue(settings.value, this)
            };
            _gaq.push([settings.trackerName, tracking.eventCategory, tracking.eventAction, tracking.eventLabel, tracking.eventValue]);
            if(settings.delayed === true && $(elm).attr("href")){
                setTimeout(function(){
                    document.location = $(elm).attr("href");
                },50);
            }
        }
    };

    $.fn.analyticsEventTracking = function(options){
        var settings = {
            category: methods.reportCategory,
            action: methods.reportAction,
            label: methods.reportLabel,
            value: methods.reportValue,
            trackerName: '_trackEvent', //default to analytics default
            delayed: true //Delay link clicks for some miliseconds
        };
        if (options){
            settings = $.extend(settings, options);
        }
        if(typeof(_gaq) !== "undefined"){
            methods.init.call( this, settings );
        }else{
            alert("Google Analaytics _gaq varible not found...");
        }
    };
})( jQuery );
