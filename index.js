// window.onload = function() {

// 	// Get references to elements on the page.
// 	var form = document.getElementById('message-form');
// 	var messageField = document.getElementById('message');
// 	var messagesList = document.getElementById('messages');
// 	var socketStatus = document.getElementById('status');
// 	var closeBtn = document.getElementById('close');

// 	// Create a new WebSocket.
// 	var socket = new WebSocket('ws://websocket-nodejs.herokuapp.com');


// 	// Handle any errors that occur.
// 	socket.onerror = function(error) {
// 		console.log('WebSocket Error: ' + error);
// 	};


// 	// Show a connected message when the WebSocket is opened.
// 	socket.onopen = function(event) {
// 		socketStatus.innerHTML = 'Connected to: ws://echo.websocket.org';
// 		socketStatus.className = 'open';
// 	};


// 	// Handle messages sent by the server.
// 	socket.onmessage = function(event) {
// 	var message = event.data;
// 		messagesList.innerHTML += '<li class="received"><span>Received:</span>' + message + '</li>';
// 	};


// 	// Show a disconnected message when the WebSocket is closed.
// 	socket.onclose = function(event) {
// 		socketStatus.innerHTML = 'Disconnected from WebSocket.';
// 		socketStatus.className = 'closed';
// 	};

// 	// Send a message when the form is submitted.
// 	form.onsubmit = function(e) {
// 		e.preventDefault();

// 		// Retrieve the message from the textarea.
// 		var message = messageField.value;

// 		// Send the message through the WebSocket.
// 		socket.send(message);

// 		// Add the message to the messages list.
// 		messagesList.innerHTML += '<li class="sent"><span>Sent:</span>' + message +
// 		                          '</li>';

// 		// Clear out the message field.
// 		messageField.value = '';

// 		return false;
// 	};


// 	// Close the WebSocket connection when the close button is clicked.
// 	closeBtn.onclick = function(e) {
// 		e.preventDefault();

// 		// Close the WebSocket.
// 		socket.close();

// 		return false;
// 	};

// };
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


var results = {up:0, down:0, left:0, right:0, forward:0, backward:0};

wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(message) 
  {
      var received = true;
      message = message.toLowerCase();

      switch(message)
      {
        case "up":
            results.up++;
            break;
        case "down":
            results.down++;
            break;
        case "left":
            results.left++;
            break;
        case "right":
            results.right++;
            break;
        case "forward":
            results.forward++;
            break;
        case "backward":
            results.backward++;
            break;
        default:
            received = false;
            break;
      }

        if(received)
        {
            ws.send("vote compiled");
            wss.clients.forEach(function each(client) {
                client.send("Vote for : " + message);
            });
        }
        else
            ws.send("vote not compiled : " + message + " is invalid");
  });

    ws.send('Connected to voting channel');
    ws.send("Choices : up, down, left, right, forward, backward");

});


setInterval(function()
{
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(results));
        client.send(Winner());
    });
    resetVote();
}, 10000);

function resetVote() {
    results.up = 0;
    results.down = 0;
    results.left = 0;
    results.right = 0;
    results.forward = 0;
    results.backward = 0;
};

function Winner(){

    var max = 0;
    var value = "";

    if(results.up > max)
    {
        value = "up";
        max = results.up;
    }
    if(results.down > max)
    {
        value = "down";
        max = results.down;
    }
    if(results.left > max)
    {
        value = "left";
        max = results.left;
    }
    if(results.right > max)
    {
        value = "right";
        max = results.right;
    }
    if(results.forward > max)
    {
        value = "forward";
        max = results.forward;
    }
    if(results.backward > max)
    {
        value = "backward";
        max = results.backward;
    }

    return value;
}
