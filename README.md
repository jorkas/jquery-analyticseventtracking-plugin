Google Analytics Event Tracking jQuery Plugin
=========================

A jQuery plugin that helps you set up easy [Event Tracking With Google Analytics] (http://code.google.com/apis/analytics/docs/tracking/eventTrackerGuide.html).

Features
--------

* Reading event tracking variables from HTML data attributes as default
* Support delay for links to be sure that the logging to Google Analytics will be stored.
* Ready for self defined functions to change use own defined function for returning values that should be stored.

Dependencies
------------

The plugin requires jQuery v1.4.3 (or higher). (HTML5 data attributes required)
The plugin requires Google Analytics script with `_gaq' variable set.

Usage
-----

`.analyticsEventTracking()` to initialize event tracking at selected elements.
You may pass an options object to customize the event values:

 - **category**
   Default is HTML data attribute at the element with `data-report-category`.

 - **action**
   Default is HTML data attribute at the element with `data-report-action`.

 - **label**
   Default is HTML data attribute at the element with `data-report-label`.

 - **value**
   Default is HTML data attribute at the element with `data-report-value`.

 - **trackerName**
   Default is `_trackEvent`.

 - **delayed**
   Default is `true`.

Examples
-----
<a href="/signup" data-report-category="signup" data-report-action="signup-click">Sign up</a>
$("a").analyticsEventTracking();

Can also be coded like this:

<a href="/signup">Sign up</a>
$("a").analyticsEventTracking({
   category: "signup",
   action: "signup-click"
});

Links
-----

* Author:  [Joakim Westerlund](http://github.com/jorkas) [Homepage](http://joakim-westerlund.se)
=======
Links
-----

* Author:  [Joakim Westerlund](http://github.com/jorkas)
* Author Homepage:  [Joakim Westerlund](http://joakim-westerlund.se)
* Company: [Mynewsdesk](http://www.mynewsdesk.com)

Please use the [GitHub issue tracker]{https://github.com/jorkas/jquery-analyticseventtracking-plugin/issues} for bug
reports and feature requests.
