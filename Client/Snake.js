var SerialPort = require("serialport").SerialPort;

var serialPort = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600
});

var canWrite = false;

serialPort.on("open", function () {
  console.log('open Serial Port');
  canWrite = true;
});


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


// the snake is a array of position (head at 0)
var snake = [{x:0,y:2,z:0},{x:0,y:1,z:0},{x:0,y:0,z:0}];
var direction = {x:0,y:1,z:0};
var point = {x:2,y:2,z:2};

// Update snake head
var total = "";
setInterval(function()
{
  if(canWrite)
  {
  	var snakeCopy = snake.slice(0);

  	for(var i=snake.length-1; i>0;i--)
  	{
  		snake[i].x = snakeCopy[i-1].x;
  		snake[i].y = snakeCopy[i-1].y;
  		snake[i].z = snakeCopy[i-1].z;
  	}

  	snake[0].x += direction.x;
  	snake[0].y += direction.y;
  	snake[0].z += direction.z;

  	// check for overflow
	snake.forEach(function(part) {
		
		if(part.x > 4)
			part.x = 0;
		if(part.y > 4)
			part.y = 0;
		if(part.z > 4)
			part.z = 0;
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