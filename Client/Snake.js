var SerialPort = require("serialport").SerialPort;
var PythonShell = require('python-shell');

var serialPort = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600
});

var canWrite = false;

/*PythonShell.run('/Myo4Linux/lib/device_lister.py', function (err) {
  if (err) throw err;
  console.log('device listener ready');
});
PythonShell.run('/Myo4Linux/sample/test_myo.py', function (err) {
  if (err) throw err;
  console.log('myo running');
});*/

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

		switch(message)
		{
			case "up":
				direction = {x:0,y:0,z:1};
				break;
			case "down":
				direction = {x:0,y:1,z:-1};
				break;
			case "left":
				direction = {x:0,y:-1,z:0};
				break;
			case "right":
				direction = {x:0,y:1,z:0};
				break;
			case "forward":
				direction = {x:1,y:0,z:0};
				break;
			case "backward":
				direction = {x:-1,y:0,z:0};
				break;
		};

		// Forward to arduino
		/*if(canWrite)
			serialPort.write(message, function(err, results) {
		    	console.log('err ' + err);
		    	console.log('results ' + results);
			});*/
	});
});


// the snake is a array of position (head at 0)
var snake = [{x:0,y:2,z:0},{x:0,y:1,z:0},{x:0,y:0,z:0}];
var direction = {x:1,y:0,z:0};
var point = {x:0,y:4,z:0};
var end = {x:0,y:0,z:0};
var hasPoint = false;

// Update snake head
var total = "";
setInterval(function()
{
  if(canWrite)
  {
  	var snakeCopy = snake.slice(0);

  	if(hasPoint)
  	{
  		snake.push({x:end.x,y:end.y,z:end.z});
  		hasPoint = false;
  	}

  	for(var i=snake.length-1; i>0;i--)
  	{
  		snake[i].x = snakeCopy[i-1].x;
  		snake[i].y = snakeCopy[i-1].y;
  		snake[i].z = snakeCopy[i-1].z;
  	}

  	snake[0].x += direction.x;
  	snake[0].y += direction.y;
  	snake[0].z += direction.z;

  	if(snake[0].x == point.x && snake[0].y == point.y && snake[0].z == point.z)
  	{
  		hasPoint = true;
  		point = {x:Math.floor(Math.random() * 4),y:Math.floor(Math.random() * 4),z:Math.floor(Math.random() * 4)};
  	}

  	// check for overflow
	snake.forEach(function(part) {

		if(part.x > 4)
			part.x = 0;
		else if(part.x <0)
			part.x = 4;

		if(part.y > 4)
			part.y = 0;
		else if(part.y <0)
			part.y = 4;

		if(part.z > 4)
			part.z = 0;
		else if(part.z <0)
			part.z = 4;
	});

  	total = "";
  	snake.forEach(function(entry) {
    	total +=  "" + entry.x + entry.y + entry.z;
	});

  	// Add point to achieve
	total += "" + point.x + point.y + point.z;

	serialPort.write(total);
	console.log("sending : %s", total);

	end = snakeCopy[snakeCopy.length-1];
  }
}, 3000);
