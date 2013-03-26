/*jshint node:true*/
'use strict';

var fs = require('fs'), path = require('path');

var jqueryCode = fs.readFileSync(path.join(__dirname, 'jquery.js'), 'utf8'),
    migrateCode = fs.readFileSync(path.join(__dirname, 'jquery-migrate.js'), 'utf8'),
    wrap = fs.readFileSync(path.join(__dirname, 'wrap.js'), 'utf8');

// Look at this fancy parser! :)
var out = wrap.replace('//JQUERY', jqueryCode).replace('//MIGRATE', migrateCode);
fs.writeFileSync(path.join(__dirname, 'index.js'), out, 'utf8');
