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
	socket.on('entername', function(queryname){
		socket.broadcast.emit("nameadded", queryname);
	});
	socket.on('getname', function(){
		var mysql = require('mysql');
		var TEST_DATABASE = 'nodetut';
		var TEST_TABLE= 'names';
		var client = mysql.createClient({
			user: 'root',
			password: '',
		});
		client.query('USE ' + TEST_DATABASE);
		client.query('SELECT * FROM ' + TEST_TABLE,
			function selectCb(err, results){
				if(err){
					throw err;
				}
				var querystring = '';
				var querylength = results.length;
				for(var i = 0; i < querylength; i++){
					querystring = querystring + results(i).person + ",";
				}
				socket.emit("givennames", querystring);
				client.end();
			});
	});
});	