var morgan = require('morgan');
var fs = require('fs');
var path = require('path')
var express = require('express');
var app = express();

var accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});
module.exports = morgan('combined',{stream:accessLogStream});