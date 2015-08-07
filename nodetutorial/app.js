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
var gamenumbers = [1,2,3];
io.sockets.on('connection', function(socket){
		socket.on('clientconnects', function(playername){			
			//io.sockets.emit('newplayer', playername);
			socket.broadcast.emit('newplayer', playername);
		});
		socket.on('startgame', function(playername){
			gamenumbers.sort(function(){return 0.5 - Math.random()})
			console.log(gamenumbers);
			io.sockets.emit('gamestarted', playername);
		});
		socket.on('sendbutton', function(data, playername){
			if(data == 'button1'){
				var thisbutton = gamenumbers[0];
			}
			if(data == 'button2'){
				var thisbutton = gamenumbers[1];
			}
			if(data == 'button3'){
				var thisbutton = gamenumbers[2];
			}
			if(thisbutton == 1){didwin = 1;}
			io.sockets.emit('getbutton', data, thisbutton);
			if(thisbutton == 1){io.sockets.emit('winner', playername);}
		});
		
});	