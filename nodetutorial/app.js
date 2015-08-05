var app = require('http').createServer(handler)
	, io = require('socket.io').listen(app)
	, fs = require('fs')
	
app.listen(8080);

function handler(req, res){
	fs.readFile(_dirname + '/index.html',
		function(err, data){
			if(err){
				res.writeHead(500);
				return res.end('Error loading index.html');
			}
			console.log(res);
			res.writeHead(200);
			res.end(data);
		});
}

io.sockets.on('connection', function(socket){
		socket.on('testconnection', function(username){
			var str = "Hello World1 " + username;
			// socket.emit only sends back to the client who sent the original information ('testconnection')
			//socket.emit('testthis', str);
			// broadcast, sends it to all client except the original client
			//socket.broadcast.emit('testthis', str);
			
			// send to everybody
			io.sockets.emit('testthis', str);
		});
});	