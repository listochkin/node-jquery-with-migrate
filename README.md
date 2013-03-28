jQuery+Migrate
==============

Latest jQuery (currently 2.0.0b2) with jQuery-Migrate plugin wrapped for Node.js and a browser (window globals, Browserify or AMD).

[![Build Status](https://travis-ci.org/listochkin/node-jquery-with-migrate.png)](https://travis-ci.org/listochkin/node-jquery-with-migrate)
[![Dependency Status](https://gemnasium.com/listochkin/node-jquery-with-migrate.png)](https://gemnasium.com/listochkin/node-jquery-with-migrate)
[![Dependency Status](https://david-dm.org/listochkin/node-jquery-with-migrate.png)](https://gemnasium.com/listochkin/node-jquery-with-migrate)
[![Selenium Test Status](https://saucelabs.com/buildstatus/listochkin-JQM)](https://saucelabs.com/u/listochkin-JQM)


Use in Node:
------------

    // jQuery in an empty document
    var $ = require('jquery-with-migrate');

    // jQuery in a custom window (from jsdom)
    var $ = require('jquery-with-migrate').create(window);

Use with Browserify:
--------------------

    // returns jQuery within a current window 
    var $ = require('jquery-with-migrate');

    // globals are still defined
    console.log($ === window.jQuery);

Use with AMD:
-------------

 1. Run **jQuery+Migrate** through Browserify:

        browserify -r jquery-with-migrate > jquery-with-migrate.js

 2. Use it in other AMD modules (exposed as `'jquery'`):

        define(['jquery'], function ($) {
            console.log($ === window.jQuery);
        });

Installing on Windows:
======================

Since **jQuery+Migrate** relies on **jsdom** that in turn depends on **contextify** it's important to have compiler toolchain properly installed on you machine. The easiest way to do it on Windows is to install:

 1. Python 2.7.3, either [directly from python.org][1], or as a [Chocolatey package][2].
 2. [Visual Studio 2012 Express for Windows Desktop][3] (it's free and comes with Windows SDK). Make sure you install it and _all_ the updates. It's pretty heavy (> 2 GiB), but you don't have another option at the moment.

Alternatively (if you're on Windows Vista or any older version) you can try installing [Visual C++ 2010 Express][4] and the corresponding version of [Windows SDK][5] (for Windows 7 that's ["Microsoft Windows SDK for Windows 7 and .NET Framework 4"][6]).


  [1]: http://www.python.org/download/releases/2.7.3/
  [2]: http://chocolatey.org/packages/python
  [3]: http://www.microsoft.com/visualstudio/eng/downloads#d-2012-express
  [4]: http://www.microsoft.com/visualstudio/eng/downloads#d-2010-express
  [5]: http://en.wikipedia.org/wiki/Windows_SDK
  [6]: http://www.microsoft.com/en-us/download/details.aspx?id=8279
