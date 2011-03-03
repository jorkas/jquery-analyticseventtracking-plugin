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
                    event.preventDefault();
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
            return $(this).data("report-value") ? $(this).data("report-value") : "";
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
            console.log("test encode",encodeString(tracking.eventCategory));
            console.log(elm);
            _gaq.push([settings.trackingName], tracking.eventCategory, tracking.eventAction, tracking.eventLabel, tracking.eventValue]);
            if(settings.delayed === true){
                setTimeout(function(elm){
                    console.log("delayed tracking");
                    console.log(elm);
                    //document.location = $(this).attr("href");
                }, 50);
            }
        }
    };

    $.fn.analyticsEventTracking = function(options){
        var settings = {
            category: methods.reportCategory,
            action: methods.reportAction,
            label: methods.reportLabel,
            value: methods.reportValue,
            trackerName: "_trackEvent", //default to analytics default
            delayed: true //Delay link clicks for some miliseconds
        };
        if (options){
            settings = $.extend(settings, options);
        }
        methods.init.call( this, settings );
    };
})( jQuery );
