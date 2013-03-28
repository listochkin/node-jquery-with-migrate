/*jshint unused:false*/
/*global require, console, process, __dirname*/
'use strict';

require('colors');
var path = require('path'),
    browserify = require('browserify'),
    jsdom = require('jsdom');

var $ = require('./index');

$('<div id="test">').appendTo($('body'));

if (!$('#test'))
    throw 'DOM test failed';
else
    console.log('DOM test passed'.green);

jsdom.env('https://google.com', function (error, window) {
    if (error) return;
    $.create(window).ajax({
        url: 'https://api.github.com/repos/joyent/node'
    }).done(function () {
        console.log('Ajax test passed'.green);
    }).fail(function (xhr, status, message) {
        throw new Error('Ajax test failer with (' + status + ') ' + message);
    });
});

browserify(path.join(__dirname, 'index.js')).bundle(function (browserifyError, code) {
    if (browserifyError) throw 'Failed to browserify: ' + browserifyError;

    var username = process.env.SOURCELABS_USERNAME || require('./sourcelabs').username,
        accessKey = process.env.SOURCELABS_ACCESSKEY || require('./sourcelabs').accessKey,
        buildId = process.env.TRAVIS_JOB_ID || Math.round(new Date().getTime() / (1000*60));

    function reportTest(passed) {
        require('request')({
            url: 'http://' + username + ':' + accessKey + '@saucelabs.com/rest/v1/' +
                    username + '/jobs/' + browser.sessionID,
            method: 'PUT',
            headers: { 'Content-Type': 'text/json' },
            body: JSON.stringify({ passed: passed, build: buildId }),
            jar: false
        }, function (error) {
            if (error) console.log(error);
        });
    }

    var wd = require('wd'),
        browser = wd.remote(
            'ondemand.saucelabs.com',
            80,
            username,
            accessKey
        );

    browser.on('status', function(info) {
        console.log(info.cyan);
    });

    browser.on('command', function(meth, path, data) {
        var s;
        if (data) {
            var dataString = JSON.stringify(data);
            s = dataString.substr(0, 200);
            if (dataString.length > s.length) s += '...';
        }
        console.log(' > ' + meth.yellow, path.grey, s || '');
    });

    try {
        browser.chain().init({
            browserName: 'chrome',
            build: buildId,
            'record-video': false
        }).get('https://google.com').execute(code, function (error) {
            if (error) throw error;
        }).safeEval('parseInt(window.jQuery.fn.jquery, 10)', function (error, result) {
            if (error) throw error;
            if (result !== 2) throw 'Unexpected result ' + result;
        }).quit(function () {
            console.log('Browser test passed'.green);
            reportTest(true);
        });
    } catch (error) {
        browser.quit(function () { reportTest(false); });
        throw error;
    }
});
