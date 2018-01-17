// load requirement
var cors = require('cors')
var bodyParser = require('body-parser');
global.colors = require('colors');
global.express = require('express');
global.app 	= global.express();
global.app.use(cors())
global.app.use(bodyParser.json()); // support json encoded bodies
global.app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var http 	= require('http').createServer(app);
global.io 	= require('socket.io')(http);
/*global.p2p = require('socket.io-p2p-server').Server
global.io.use(global.p2p)*/

// connect server
let port = process.env.PORT;
http
.listen(function() {
	global.app.use('/assets',global.express.static('assets'))

    console.log('server node running on port ');
});