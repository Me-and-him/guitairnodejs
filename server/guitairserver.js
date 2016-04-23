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
server.listen(PORT);
 
app.use('/static', express.static(__dirname + '/static'));
 
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

function createOnPhoneMessageListener(client) {
	function onPhoneMessage(message) {
		console.log('message ' + message.time + ' ' + message.move + ' was sent');
		client.json.send(message);
	}
	return onPhoneMessage;
}

//подписываемс€ на событие соединени€ нового клиента
io.sockets.on('connection', function (client) {
    //подписываемс€ на событие message от клиента
    client.on('message', function (message) {
        try {
			console.log('some client connected');
            if (message.type == 'phone') {
				if (message.code in pagelist) {
					console.log('requesting page with code ' + message.code);
					client.on('message', createOnPhoneMessageListener(pagelist[message.code]));
				} else {
					console.log("requested unregistred page.");
					client.disconnect();
					// TODO! client.json.send({status: ''});
				}
			} else if (message.type == 'webpage') {
				// Add this page to list...
				console.log('webpage with code ' + message.code + ' registered');
				pagelist[message.code] = client;
			}
        } catch (e) {
            console.log(e);
            client.disconnect();
        }
    });
});