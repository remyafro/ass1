'use strict';

var fs = require('fs');


function confirmation(data){

	var newData = formatData(data);
	console.log("Formatting student info");
	updateCSV(newData);
	console.log("Inserting into csv...");
	return successHTML();
}

function formatData(data){

	var stringData = data.toString();
	var formattedData = (((((stringData.split("&")).toString()).split("=").toString()).replace(/,/g, " ").split(" ")));
	console.log(formattedData);
	return formattedData;
}

function updateCSV(data){

	var newData = data;

	for (var i =0; i < newData.length; i++){
		newData.splice([i], 1);
	}
	var csvInfo = newData.toString() + "\r\n";
	console.log(csvInfo);
	fs.appendFile("./data/data.csv", csvInfo , function(err){
		if (err) throw err;
		console.log('Data added to file!');
	});

}

function successHTML(){
	var html =  '<!DOCTYPE html>' +
		'<html lang="en">'+
		'<head>'+
		'<meta charset="UTF-8">'+
		'<link rel="icon" href="data:,">'+
		'<link rel="stylesheet" href="/css"/>'+
		'<title>Remy Assignment 1</title>'+
		'</head>'+
		'<body>'+
		'<header class="header">'+
		'<div class="navbar">'+
		'<ul class="navbar_main">'+
		'<li class="navbar_item"><a href="/addStudent">Add Student</a></li>'+
		'<li class="navbar_item-desktop"><a href="/degreeList">List Of Students</a></li>'+
		'<li class="navbar_item-desktop"><a href="/uploadImage">Upload Image</a></li>'+
		'</ul>'+
		'</div>'+
		'</header>'+
		'<div class="main">'+
		'<h1 class="intro">Student Added!</h1>'+
		'</div>'+
		'</body>'+
		'<footer>'+
		'<a href="/">return home</a>'+
		'</footer>'+
		'</html>';

	return html;
}


exports.confirmation = confirmation;