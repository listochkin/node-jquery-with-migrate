/*jshint unused:false */
/*globals require, module */
'use strict';
(function () {
    var global = this,
        XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

    // jQuery assumes XMLHttpRequest to be global
    if (!('XMLHttpRequest' in global)) global.XMLHttpRequest = XMLHttpRequest;

    function create (window) {
        if (typeof window === 'undefined' || !('document' in window)) {
            // setup an environment:
            // work around browserify attempting to load jsdom
            var nodeRequire = require;
            var jsdom = nodeRequire('jsdom').jsdom;
            var doc = jsdom('<html><head></head><body></body></html>');
            window = doc.createWindow();
        }

        // jsdom includes an incomplete version of XMLHttpRequest
        window.XMLHttpRequest = global.XMLHttpRequest;

        (function () {
//========================================
//JQUERY
//========================================
        }.call(window)); // `this` should point to window inside jquery.js

        // jQuery puts itself into `module.exports` if it's available
        // jQuery 2.0 doesn't put itself into window or global,
        // however Migrate need a reference to it
        var jQuery = window.jQuery = window.$ = module.exports;

        (function () {
            // Migrate assumes document is in the scope
            var document = window.document;
            // Migrate assumes navigator is in the scope
            var navigator = window.navigator;
//========================================
//MIGRATE
//========================================
        }.call(window));

        // since jQuery returned itself via module.exports we have to register it in AMD ourselves
        var define = window.define || global.define;
        if ( typeof define === 'function' && define.amd ) {
            // jQuery registers itself with lowercase name
            define( 'jquery', [], function () { return jQuery; } );
        }

        // `xmlhttprequest` does CORS requests although it doesn't expose `withCredentials` atm
        jQuery.support.cors = true;
        return jQuery;
    }

    // create a jQuery instance for an empty document by default
    var window = 'window' in global && global.window === global ? global : void 0;
    module.exports = create(window);
    // leave an option to create an instance for provided window
    module.exports.create = create;
}).call((function () { var ev = (1, eval); return this || ev('this') })());