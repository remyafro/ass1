'use strict';

var fs = require('fs');

var degrees = [];

function totalList(data){

	var currentTotal = [];
	var students = [];

	var csv = 'csv/data.csv';
	var encoding = 'utf-8';
	var csvData = fs.readFileSync(csv,encoding);

	var reqDegree = data.toString();
	console.log('totalList for: ' + reqDegree);

	var string = (csvData.split(',')).toString().split(/\r\n/);

	for(var i=0; i<string.length;i++){
		var param = string[i].split(',');
		var student = new Student(param[0],param[1],param[2],param[3],param[4],param[5]);
		students.push(student);
	}

	for(var i=0; i < students.length; i++){
		var currentStudent = students[i];

		if(currentStudent.degree === reqDegree){
			currentTotal.push(currentStudent.row);
		}
	}

	var total = currentTotal.length;

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
			'<li class="navbar_item-desktop"><a href="#">Upload Image</a></li>' +
			'</ul>' +
			'</div>' +
			'</header>' +
			'<div class="main">' +
			'<h1 class="intro">List Student</h1>' +
			'<div class="content_main">' +
			'<h2>There are a total of ' + total + ' students taking ' + reqDegree + '</h2>' +
			'<table id="addStudentTable">' +
			'<tr>' +
			'<th>Student ID</th>' +
			'<th>First Name</th>' +
			'<th>Last Name</th>' +
			'<th>Age</th>' +
			'<th>Gender</th>' +
			'<th>Degree</th>' +
			'</tr>' +
			(( currentTotal.join("")).toString() )+
			'</table>' +
			'</div>' +
			'</div>' +
			'</body>' +
			'<footer>' +
			'<a href="/">return home</a>' +
			'</footer>' +
			'</html>' ;

		return html;

}

function getCurrentDegrees(){

	var csv = 'csv/data.csv';
	var encoding = 'utf-8';
	var data = fs.readFileSync(csv,encoding);
	var students = [];

	// console.log(data);

	var string = (data.split(',')).toString().split(/\r\n/);
	// console.log(string);

	for(var i=0; i<string.length;i++){
		var param = string[i].split(',');
		var student = new Student(param[0],param[1],param[2],param[3],param[4],param[5]);
		students.push(student);
		var degree = student.degree;

		if(!degrees.includes(degree)){ // add new degree
			degrees.push(degree);
		}

	}

	var degreeOptions = [];

	for (var j=0;j<degrees.length;j++){
		var value = degrees[j];

		var degreeOption = '<option value="' + value + '">' + value +'</option>';
		degreeOptions.push(degreeOption);
	}

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
		'<li class="navbar_item-desktop"><a href="/listStudent">List Of Students</a></li>' +
		'<li class="navbar_item-desktop"><a href="#">Upload Image</a></li>' +
		'</ul>' +
		'</div>' +
		'</header>' +
		'<div class="main">' +
		'<h1 class="intro">List Student</h1>' +
		'<div class="content_main">' +
		'<h2>Pick a Degree for students you want to list</h2>' +
		'<form id="listStudentForm" method="POST" action="/listStudent">' +
		'<div class="form_element">' +
		'<label>Degree:</label>' +
		'<select name="degree" required>' +
		degreeOptions +
		'</select>' +
		'</div>' +

		'<button type="submit" value="submit">Submit</button>' +
		'</div>' +
		'</div>' +
		'</body>' +
		'<footer>' +
		'<a href="/">return home</a>' +
		'</footer>' +
		'</html>' ;

	return html;
}

function Student(studentID, firstName, lastName, age, gender, degree){

	this.studentID = studentID;
	this.firstName = firstName;
	this.lastName = lastName;
	this.age = age;
	this.gender = gender;
	this.degree = degree;
	this.row =
		'<tr>'+
		'<td>' + studentID + '</td>' +
		'<td>' + firstName + '</td>' +
		'<td>' + lastName + '</td>' +
		'<td>' + age + '</td>' +
		'<td>' + gender + '</td>' +
		'<td>' + degree + '</td>' +
		'</tr>'
}


exports.totalList = totalList;
exports.getCurrentDegrees = getCurrentDegrees;