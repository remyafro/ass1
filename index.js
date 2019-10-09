'use strict';

var server = require('./js/server');
var router = require('./js/router');
var rh = require('./js/requestHandler');

var handle = {};

handle["/"] = rh.reqHome;
handle["/css"] = rh.reqCss;
handle["/favicon"] = rh.reqFavi;
handle["/favicon.ico"] = rh.reqFavi;
handle["/reqError"] = rh.reqError;
handle["/addStudent"] = rh.reqAddStudent;
handle["/degreeList"] = rh.reqDegreeList;
handle["/listStudent"] = rh.reqListStudent;

server.startServer(router.route, handle);