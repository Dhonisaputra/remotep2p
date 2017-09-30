// load requirement
global.express = require('express');
global.app 	= global.express();
var http 	= require('http').createServer(app);
global.io 	= require('socket.io')(http);
/*global.p2p = require('socket.io-p2p-server').Server
global.io.use(global.p2p)*/

// connect server

http
.listen(process.env.PORT || global.PORT, function() {
	global.app.use('/assets',global.express.static('assets'))

    console.log('server node running...');
});