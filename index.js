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
        break;
    }

    wss.clients.forEach(function each(client) 
    {
      message = message.toUpperCase();
      client.send("registered a vote for " + message);
    });
  });

});

// // update score values every .5 seconds
// setInterval(function()
// {
//     wss.clients.forEach(function each(client) 
//     {
//         client.send(JSON.stringify(results));
//     });
// }, 500);

// // select next move every 10 seconds and reset scores
// setInterval(function()
// {
//     wss.clients.forEach(function each(client) 
//     {
//         client.send(getWinner());
//         ResetVotes();
//     });
// }, 10000);

// function getWinner()
// {
//     var max = 0;
//     var value = "";
    
//     if(results.up > max)
//     {
//         value = "up";
//         max = value.up;
//     }
//     if(results.down > max)
//     {
//         value = "down";
//         max = value.down;
//     }
//     if(results.left > max)
//     {
//         value = "left";
//         max = value.left;
//     }
//     if(results.right > max)
//     {
//         value = "right";
//         max = value.right;
//     }
//     if(results.forward > max)
//     {
//         value = "forward";
//         max = value.forward;
//     }
//     if(results.backward > max)
//     {
//         value = "backward";
//         max = value.backward;
//     }

//     return value;
// }

// function ResetVotes()
// {
//  results.up = 0;
//  results.down = 0;
//  results.left = 0;
//  results.right = 0;
//  results.forward = 0;
//  results.backward = 0;
// }