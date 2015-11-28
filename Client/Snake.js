var SerialPort = require("serialport").SerialPort;

var serialPort = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600
});

var canWrite = false;

serialPort.on("open", function () {
  console.log('open Serial Port');
  canWrite = true;
});


// the snake is a array of position (head at 0)
var snake = [{x:0,y:2,z:0},{x:0,y:1,z:0},{x:0,y:0,z:0}];
var direction = {x:0,y:1,z:0};
var point = {x:2,y:2,z:2};


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


// Update snake head
var total = "";
setInterval(function()
{
  if(canWrite)
  {
	snake.forEach(function(entry) {
    	
    	entry.x += direction.x;
    	entry.y += direction.y;
    	entry.z += direction.z;

    	if(entry.x > 4)
    		entry.x = 0;
    	if(entry.y > 4)
    		entry.y = 0;
    	if(entry.z > 4)
    		entry.z = 0;
	});

	total = "";
  	snake.forEach(function(entry) {
    	total +=  "" + entry.x + entry.y + entry.z;
	});

  	// Add point to achieve
	total += "" + point.x + point.y + point.z;

	serialPort.write(total);
	console.log("sending : %s", total);
  }
}, 3000);