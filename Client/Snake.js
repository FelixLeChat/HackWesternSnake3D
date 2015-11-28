var SerialPort = require("serialport").SerialPort;

var serialPort = new SerialPort("/dev/ttyACM0", {
//var serialPort = new SerialPort("/dev/COM28", {
  baudrate: 9600
});

var canWrite = false;

serialPort.on("open", function () {
  console.log('open Serial Port');
  canWrite = true;
});


// the snake is a array of position (head at 0)

var ws = require("nodejs-websocket");
var wsConnected = ws.connect("ws://websocket-nodejs.herokuapp.com", function(wss)
{
	console.log("connect to websocket");
});

wsConnected.on('connect', function() {
	console.log('Connection established');

	wsConnected.on('text', function incoming(message) {


		console.log('received: %s', message);

		if(canWrite)
			serialPort.write(message, function(err, results) {
		    	console.log('err ' + err);
		    	console.log('results ' + results);
			});
	});
});

var total = "";
var snake = [{x:0,y:2,z:0},{x:0,y:1,z:0},{x:0,y:0,z:0}];
var direction = {x:0,y:1,z:0};
var point = {x:2,y:2,z:2};
// Update snake head
setInterval(function(){
  
  if(canWrite){

  	total = "";

  	snake.forEach(function(entry) {
    	total +=  "" + entry.x + entry.y + entry.z;
	});

  	// Add point to achieve
	total += "" + point.x + point.y + point.z;

	serialPort.write(total);
	console.log("sending : %s", total);

	for(var i = 0; i <= snake.length; i++)
	{
		snake[i] = snake[i+1];
	}
	snake[i] = snake[0]

	// advance snake
	//snake[2]
	//snake[1] = new {x:snake[0].x,y:snake[0].y,z:snake[0].z};

	/*var head = snake[0];
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
    		snake[0].z = 0;*/

  }
}, 3000);