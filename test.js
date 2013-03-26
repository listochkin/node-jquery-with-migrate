/*global require, console*/
'use strict';
var $ = require('./index');

$('<div id="test">').appendTo($('body'));

if (!$('#test'))
    throw 'Test failed';
else
    console.log('Test passed');
