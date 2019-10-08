'use strict';

var fs = require('fs');

function route(handle, pathname, request, response) {

    var a = pathname.replace("/","");

    if(typeof handle[pathname] === 'function') {

        handle[pathname](request, response, pathname);
    }else if (fs.existsSync(a)) {
        handle["/reqFile"](request, response, pathname);
    }else {
        console.log("error for " + pathname );

        handle["/reqError"](request, response, pathname);
    }
}
exports.route = route;