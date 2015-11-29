var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

// Get references to elements on the page.
var form = document.getElementById('message-form');
var messageField = document.getElementById('message');
var messagesList = document.getElementById('messages');
var socketStatus = document.getElementById('status');
var closeBtn = document.getElementById('close');


wss.on('connection', function connection(ws) {
	
	ws.on('message', function incoming(message) 
	{

	});

});