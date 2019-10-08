'use strict';

var server = require('./js/server');
var router = require('./js/router');
var rh = require('./js/requestHandler');

var handle = {};

handle["/"] = rh.reqHome;
handle["/css"] = rh.reqCss;
handle["/reqError"] = rh.reqError;

server.startServer(router.route, handle);