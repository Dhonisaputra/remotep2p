var express = require('express');
var app 	= express();
var http 	= require('http').createServer(app);
var io 		= require('socket.io')(http);
var fs 		= require("fs");

var req = {
	express : express,
	app 	: app,
	http 	: http,
	io 		: io,
	fs 		: fs,
}


require(global.SYSTEM_PATH('Routes'))(req)
module.exports = req;