/*jshint unused:false*/
/*global require, console*/
'use strict';
var $ = require('./index');

$('<div id="test">').appendTo($('body'));

if (!$('#test'))
    throw 'DOM test failed';
else
    console.log('DOM test passed');

require('jsdom').env('https://google.com', function (error, window) {
    if (error) return;
    $.create(window).ajax({
        url: 'https://api.github.com/repos/joyent/node'
    }).done(function () {
        console.log('Ajax test passed');
    }).fail(function (xhr, status, message) {
        throw new Error('Ajax test failer with (' + status + ') ' + message);
    });
});
