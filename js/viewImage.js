'use strict';

function showImage(path){

	var imagePath = path;

	var html = '<!DOCTYPE html>' +
		'<html lang="en">' +
		'<head>' +
		'<meta charset="UTF-8">' +
		'<link rel="stylesheet" href="/css"/>' +
		'<title>Remy Assignment 1</title>' +
		'</head>' +
		'<body>' +
		'<header class="header">' +
		'<div class="navbar">' +
		'<ul class="navbar_main">' +
		'<li class="navbar_item"><a href="/addStudent">Add Student</a></li>' +
		'<li class="navbar_item-desktop"><a href="/degreeList">List Of Students</a></li>' +
		'<li class="navbar_item-desktop"><a href="/uploadImage">Upload Image</a></li>' +
		'</ul>' +
		'</div>' +
		'</header>' +
		'<div class="main">' +
		'<h1 class="intro">Your Picture</h1>' +
		'<div class="content_main">' +
		'<img src="'+ imagePath +'">'+
		'<form id="uploadImageForm" method="POST" enctype="multipart/form-data" action="/addImage">' +
		'<div class="form_element">' +
		'<input type="file" name="upload" id="upload" multiple="multiple" required="true">' +
		'</div>' +

		'<button type="submit" value="upload">Submit</button>' +
		'</form>' +

		'</div>' +
		'</div>' +
		'</body>' +
		'<footer>' +
		'<a href="/">return home</a>' +
		'</footer>' +
		'</html>' ;

	return html;
}

exports.showImage = showImage;