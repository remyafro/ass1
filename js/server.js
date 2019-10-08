'use strict';

var http = require ('http');
var url = require('url');

function startServer(route,handle) {

	function onRequest(requst, response){

		var pathname = url.parse(request.url).pathname;
		console.log(request.method + "REQUEST FOR: " + parhname);
		route(handle, pathname, request, response);
	}

	http.createServer(onRequest).listen(41118);
	console.log('SERVER IS RUNNING ON PORT: 41118');
	console.log('PROCESS ID: ', process.pid);
};
exports.startServer = startServer;