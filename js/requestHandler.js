'use strict';

var fs = require('fs');
var formidable = require('formidable');
var Readable = require('stream').Readable;

var addStudent = require('./addStudent');
var listStudent = require('./listStudent');
var viewImage = require('./viewImage');

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

function reqFavi(request, response){
    response.writeHead(200, {'Content-Type' : 'image/png'});
    fs.createReadStream('favicon.ico').pipe(response);
}

function reqAddStudent(request, response){
    response.writeHead(200, {'Content-Type' : 'text/html'});
    var add = fs.createReadStream('html/addStudent.html');
    add.pipe(response);

    request.on('data', function(data){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(addStudent.confirmation(data));
        response.end();

    });
}

function reqDegreeList(request, response){
    var read = new Readable();
    read.push(listStudent.getCurrentDegrees(), 'utf-8');
    read.push(null);
    response.writeHead(200, {'Content-Type' : 'text/html'});
    read.pipe(response);
}

function reqListStudent(request, response){
    response.writeHead(200, {'Content-Type' : 'text/html'});
    var degree = "";
    if (request.method == 'POST'){
        var body = '';

        request.on('data', function(data){
            body += data;
        });

        request.on('end', function (){
            degree = (((body.toString()).replace(/degree=/g, "")));
            // console.log('Request students for : ' + degree);
            response.writeHead(200, {'Content-Type' : 'text/html'});
            response.write(listStudent.totalList(degree));
            response.end();
        });
    }

}

function reqUploadImage(request, response){
    response.writeHead(200, {'Content-Type' : 'text/html'});
    var page = fs.createReadStream('html/uploadImage.html');
    page.pipe(response);

}

function reqAddImage(request, response) {

    var form = new formidable.IncomingForm();
    form.uploadDir = './tmp/';

    form.parse(request, function (err, fields, files) {

        var oldPath = files.upload.path;
        console.log(oldPath);
        var newPath = 'images/' + files.upload.name;

        fs.rename(oldPath, newPath, function (err) {
            if (err) {
                fs.unlink(oldPath);
                fs.rename(oldPath, newPath);
            }

            var rs = viewImage.showImage(newPath)
            response.writeHead(200, {'Content-Type' : 'text/html'});
            response.write(rs);
            response.end();
        });
    })

}

function reqFile(request, response, pathname) {
    var pathname = pathname.replace("/","");
    console.log("getting image..");

    console.log(pathname);
    response.writeHead(200, {"Content-Type":"image/png"});
    fs.createReadStream(pathname).pipe(response);


}


exports.reqHome = reqHome;
exports.reqCss = reqCss;
exports.reqFavi = reqFavi;
exports.reqError = reqError;
exports.reqAddStudent = reqAddStudent;
exports.reqListStudent = reqListStudent;
exports.reqDegreeList = reqDegreeList;
exports.reqUploadImage = reqUploadImage;
exports.reqAddImage = reqAddImage;
exports.reqFile = reqFile;