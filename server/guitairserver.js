var PORT = 5000;
 
var options = {
//    'log level': 0
};

var pagelist = [];
 
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server, options);

var swig = require('swig');
var jumanji = require('jumanji');
var DEBUG_CODE_1 = '1234'
var DEBUG_CODE_2 = '1488'
pagelist[DEBUG_CODE_1] = undefined
pagelist[DEBUG_CODE_2] = undefined

//Setup swig renderer
//app.engine('html', swig.renderFile);
//app.set('view engine', 'html');
//app.set('views', __dirname + '/public');

//Routing page
app.get('/', function (req, res) {
	console.log('proceeding pagerequest...');
	var code = getuniqcode();
	
	//var tmp = swig.compileFile(__dirname + '/public/index.html');
	res.status(200).send(swig.renderFile(__dirname + '/public/index.html', {page_code : code}));
});

app.use('/static', express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/public'));
app.use(jumanji);

function getuniqcode() {
	code = Math.floor(Math.random() * (9999 - 0 + 1)) + 0;
	code = ("0000" + code).slice(-4);
	
	while (code in pagelist){
		code = Math.floor(Math.random() * (9999 - 0 + 1)) + 0;
		code = ("0000" + code).slice(-4);
	}
	console.log('generated code: ' + code);
	return code;
}



function createOnPhoneMessageListener(client) {
	function onPhoneMessage(message) {
		try {
			console.log('message ' + message.time.toString() + ' ' + message.move.toString() + ' was sent to ' + client);
			switch (message.move){
				case 1: mMovement = 'up'; break;
				case 2: mMovement = 'down'; break;
				case 3: mMovement = 'START'; break;
				case 4: mMovement = 'STOP'; break;
				case 5: mMovement = 'pass'; break;
			}
			client.json.send({time:message.time, movement:mMovement});
		} catch (e) {
            console.log(e);
            //client.disconnect();
        }
	}
	return onPhoneMessage;
}

io.sockets.on('connection', function (client) {
    client.on('message', function (message) {
        try {
			//console.log('some client connected');
            if (message.type == 'phone') {
				if (message.code in pagelist) {
					console.log('requesting page with code ' + message.code);
					client.on('message', createOnPhoneMessageListener(pagelist[message.code]));
				} else {
					console.log("requested unregistred page: " + message.code);
					client.disconnect();
					// TODO! client.json.send({status: ''});
				}
			} else if (message.type == 'webpage') {
				// Add this page to list...
				console.log('webpage with code ' + message.code + ' registered as' + client);
				pagelist[message.code] = client;
			}
        } catch (e) {
            console.log(e);
            client.disconnect();
        }
    });
	client.on('disconnect', function (client) {
		for(var key in pagelist){
			if (pagelist.key == client){
				console.log('webpage with code ' + message.code + ' registered');
				delete pagelist.key;
			}
		}
	});
});
server.listen(PORT);
console.log('GuitairServer started on ',PORT);