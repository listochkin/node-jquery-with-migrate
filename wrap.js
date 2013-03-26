/*jshint unused:false*/
/*globals require, module */
'use strict';
(function () {
    var global = this;

    function create (window) {
        if (typeof window === 'undefined' || !('document' in window)) {
            // setup an environment:
            var jsdom = require('jsdom').jsdom;
            var doc = jsdom('<html><head></head><body></body></html>');
            window = doc.createWindow();
        }

        (function () {
//========================================
//JQUERY
//========================================
        }.call(window)); // `this` should point to window inside jquery.js

        // jQuery puts itself into `module.exports` if it's available
        return module.exports;
    }

    // create a jQuery instance for an empty document by default
    var window = 'window' in global && global.window === global ? global : void 0;
    module.exports = create(window);
    // leave an option to create an instance for provided window
    module.exports.create = create;
}).call((function () { var ev = (1, eval); return this || ev('this') })());