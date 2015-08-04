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
		socket.on('testconnection', function(){
			socket.emit('testthis', "Hello World1");
		});
});	