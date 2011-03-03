/**
 * @author Joakim Westerlund
 */
(function( $ ){
    var methods = {
        init: function(settings){
            this.each(function(){
                $(this).click(function(event){
                    event.preventDefault();
                    return methods.trackEvent.call($(this),settings);
                });
            });
        },
        getEventValue: function(value,elm){
            if($.isFunction(value)){
                return value.call(elm);
            }else{
                //console.log("string or something:", value);
                return value;
            }
        },
        reportCategory: function(){
            return $(this).data("report-category");
        },
        reportAction: function(){
            return $(this).data("report-action");
        },
        reportLabel: function(){
            return $(this).data("report-label");
        },
        reportValue: function(){
            return $(this).data("report-value");
        },
        trackEvent: function(){
            var settings = arguments[0];
            var tracking = {
                eventCategory: methods.getEventValue(settings.category, this),
                eventAction: methods.getEventValue(settings.action, this),
                eventLabel: methods.getEventValue(settings.label, this),
                eventValue: methods.getEventValue(settings.value, this)
            };
            console.log(tracking);
            
            //_gaq.push(['_trackEvent', 'Videos', 'Play', 'Baby\'s First Birthday'])
        }
    };

    $.fn.googleEventTracking = function(options){
        var settings = {
            category  : methods.reportCategory,
            action    : methods.reportAction,
            label     : methods.reportLabel,
            value     : methods.reportValue
        };
        if (options){
            settings = $.extend(settings, options);
        }
        methods.init.call( this, settings );
        /*if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.googleEventTracking' );
        }*/   

    };
})( jQuery );

function externalFunction(elm){
    console.log(this);
    return "test";
}


                // Do your awesome plugin stuff here
                /* $$(".event-tracking").each(function(elm){
            elm.observe("click", function(evt){
                var category = elm.readAttribute("data-event-category");
                var action = elm.readAttribute("data-event-action");
                var label = elm.readAttribute("data-event-label");
                var value = elm.readAttribute("data-event-value");
                if(!elm.hasClassName("ajax-tracking")){
                    evt.preventDefault();
                    setTimeout(function(){
                        document.location = elm.href;
                    }, 100);
                }
                _gaq.push(['mndTracker._trackEvent', category, action, label, value]);
            });
        });
    */
