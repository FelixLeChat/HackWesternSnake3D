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

wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(message) 
  {
    console.log('received: %s', message);
    wss.clients.forEach(function each(client) {
	    client.send(message);
	  });
  });

  ws.send('Connected :D');
});

/*ws.on('open', function open() {
  console.log('connected');
  ws.send(Date.now().toString(), {mask: true});
});

ws.on('close', function close() {
  console.log('disconnected');
});

ws.on('message', function message(data, flags) {
  console.log('Roundtrip time: ' + (Date.now() - parseInt(data)) + 'ms', flags);

  setTimeout(function timeout() {
    ws.send(Date.now().toString(), {mask: true});
  }, 500);
});*/

var total = "";
var snake = [{x:0,y:2,z:0},{x:0,y:1,z:0},{x:0,y:0,z:0}];
var direction = {x:0,y:1,z:0};
var point = {x:2,y:2,z:2};
// Update snake head
setInterval(function(){
  
  if(true){

  	total = "";

  	snake.forEach(function(entry) {
    	total +=  "" + entry.x + entry.y + entry.z;
	});

  	// Add point to achieve
	total += "" + point.x + point.y + point.z;

	var head = snake[0];
	for(var i = snake.length-1; i >= 1; i--) {
		snake[i-1] = snake[i];
	}
	snake[0] = head;

	// next position for snake head
	snake[0].x += direction.x;
    snake[0].y += direction.y;
    snake[0].z += direction.z;

    	if(snake[0].x > 4)
    		snake[0].x = 0;
    	if(snake[0].y > 4)
    		snake[0].y = 0;
    	if(snake[0].z > 4)
    		snake[0].z = 0;

    wss.clients.forEach(function each(client) {
	    client.send(total);
	  });

  }
}, 3000);