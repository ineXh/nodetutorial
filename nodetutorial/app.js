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
		
		var connection = mysql.createConnection({
		  //host     : 'example.org',
		  user     : 'root',
		  password : '',
		});

		/*
		var client = mysql.createClient({
			user: 'root',
			password: '',
		});*/
		connection.query('USE ' + TEST_DATABASE);
		//console.log('TEST_DATABASE')
		//console.log('SELECT * FROM ' + TEST_TABLE);
		connection.query('SELECT * FROM ' + TEST_TABLE,
			function selectCb(err, results){
				//console.log("selectCb");
				if(err){
					console.log("error!!");
					throw err;
				}
				//console.log(results);
				var querystring = '';
				var querylength = results.length;
				..console.log(querylength);
				for(var i = 0; i < querylength; i++){
					querystring = querystring + results[i].person + ",";
				}
				//console.log(querystring);
				socket.emit("givennames", querystring);
				connection.end();
			});
	}); // end on getname
});	// end on getconnection