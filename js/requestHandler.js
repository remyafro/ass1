'use strict';

var path = require('path');
var http = require('http');
var http = require('https');
var url = require('url');
var qs = require('querystring');
var util = require('util');
var fs = require('fs');
var exec = require('child_process').exec;
var formidable = require('formidable');
var readable = require('stream').Readable;

function reqError(request, response){
    response.writeHead(200, {'Content-Type' : 'text/html'});
    var error = fs.createReadStream('html/404.html');
    error.pipe(response);
}

function reqHome(request, response){
    response.writeHead(200, {'Content-Type' : 'text/html'});
    var homePage = fs.createReadStream('index.html');
    homePage.pipe(response);
}

function reqCss(request, response){
    var css = fs.createReadStream('./css/style.css');
    css.pipe(response);
}



exports.reqHome = reqHome;
exports.reqCss = reqCss;
exports.reqError = reqError;