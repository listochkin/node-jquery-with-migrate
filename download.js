/*jshint node:true, forin: false*/
'use strict';

var request = require('request'), filed = require('filed');

var files = {
    'jquery.js': 'http://code.jquery.com/jquery-2.0.0b2.js',
    'jquery-migrate.js': 'http://code.jquery.com/jquery-migrate-1.1.1.js'
};

for (var file in files)
    request(files[file]).pipe(filed(file));
