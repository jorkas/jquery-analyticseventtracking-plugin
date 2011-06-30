/**
 * @author Joakim Westerlund
 * @version 1.0 (2011-05-21)
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
            return $(this).data("jaet-report-category") ? $(this).data("jaet-report-category") : "DefaultCategory";
        },
        reportAction: function(){
            return $(this).data("jaet-report-action") ? $(this).data("jaet-report-action") : "DefaultAction";
        },
        reportLabel: function(){
            return $(this).data("jaet-report-label") ? $(this).data("jaet-report-label") : "";
        },
        reportValue: function(){
            return $(this).data("jaet-report-value") ? $(this).data("jaet-report-value") : 0;
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
            trackerName: '_trackEvent', //Default to Analytics default
            delayed: true //Delay link clicks for some miliseconds
        }, errorMsg;
        if (options){
            settings = $.extend(settings, options);
        }
        if(typeof(_gaq) !== "undefined"){
            methods.init.call( this, settings );
        }else {
			errorMsg = "Google Analaytics _gaq varible not found! Please set up Google Analytics properly.";
			
			if(console && console.error && typeof console.error === "function"){
				console.error(errorMsg);
			} else {
				throw errorMsg;
			}
        }
    };
})( jQuery );
