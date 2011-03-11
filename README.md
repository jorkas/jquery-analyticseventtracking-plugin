Google Analytics Event Tracking
=========================

A jQuery plugin that helps you set up easy Event Tracking With Google Analytics (http://code.google.com/apis/analytics/docs/tracking/eventTrackerGuide.html).

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
   Default is HTML5 data attribute at the element with `data-report-category`.

 - **action**
   Default is HTML5 data attribute at the element with `data-report-action`.

 - **action**
   Default is HTML5 data attribute at the element with `data-report-action`.

 - **value**
   Default is HTML5 data attribute at the element with `data-report-value`.

 - **trackerName**
   Default is `_trackEvent`.

 - **delayed**
   Default is `true`.

Links
-----

* Author:  [Joakim Westerlund](http://github.com/jorkas)
* Author Homepage:  [Joakim Westerlund](http://joakim-westerlund.se)
* Company: [Mynewsdesk](http://www.mynewsdesk.com)

Please use the [GitHub issue tracker]{https://github.com/jorkas/jquery-analyticseventtracking-plugin/issues} for bug
reports and feature requests.
