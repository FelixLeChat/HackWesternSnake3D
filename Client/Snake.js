var SerialPort = require("serialport").SerialPort;
var net = require('net');

var server = net.createServer(function(socket){
    socket.write('Echo server\r\n');
    socket.pipe(socket);
})

server.listen(1337, '127.0.0.1', function(data){
  console.log(data)
});


server.on('data', function(data){
  console.log(data)
});


/*
var spawn = require('child_process').spawn;
var PythonShell = require('python-shell');
describe('PythonShell', function () {
  PythonShell.defaultOptions = {
    scriptPath: './Myo4Linux/sample/test_myo.py'
  };

      describe('#ctor(script, options)', funcion(){
        it('should spawn process', function (done) {
            var pyshell = new PythonShell('/Myo4Linux/sample/test_myo.py');
            pyshell.command.should.eql(['test/python/exit-code.py']);
            pyshell.terminated.should.be.false;
            pyshell.end(function (err) {
                 if (err) return done(err);
                 pyshell.terminated.should.be.true;
                 done();
      });
  });
});
*/

//var ls = spawn('python',['/Myo4Linux/sample/test_myo.py']);

/*
ls.stdout.on('data', function (data) {
console.log('stdout: ' + data);
});

ls.stderr.on('data', function (data) {
console.log('stderr: ' + data);
});

var PythonShell = require('python-shell');
var pyshell = new PythonShell('Myo4Linux/lib/device_listener.py');
>>>>>>> origin/master

var serialPort = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600
});

var canWrite = false;


serialPort.on("open", function () {
  console.log('open Serial Port');
  canWrite = true;
});

/*
var ws = require("nodejs-websocket");
var wsConnected = ws.connect("ws://websocket-nodejs.herokuapp.com", function(wss)
{
	//console.log("connect to websocket");
});

wsConnected.on('connect', function() {
	//console.log('Connection established');

	wsConnected.on('text', function incoming(message) {


		//console.log('received: %s', message);

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
			});
	});
});


// the snake is a array of position (head at 0)
var defaultSnake = [{x:0,y:2,z:0},{x:0,y:1,z:0},{x:0,y:0,z:0}];
var snake = defaultSnake;
var direction = {x:0,y:1,z:0};
var point = {x:0,y:4,z:0};
var end = {x:0,y:0,z:0};
var hasPoint = false;

var lifes = 9;

// Update snake head
var total = "";
setInterval(function()
{
  if(canWrite && lifes >= 0)
  {
  	if(snake.length == 0)
  		snake = defaultSnake.slice(0,3);

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
  		//point = {x:Math.floor(Math.random() * 4),y:Math.floor(Math.random() * 4),z:Math.floor(Math.random() * 4)};
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



	end = snakeCopy[snakeCopy.length-1];

	if(isHittingItself())
	{
		console.log(snake);
		lifes --;
		serialPort.write("" + lifes);
		snake = [];
		//snake = defaultSnake;
		console.log("lifes left : %s", lifes);
		console.log(snake);

		if(lifes == 0)
		{
		}
	}
	else
	{
		///serialPort.write(total);
		//console.log("sending : %s", total);
	}
  }
}, 3000);


function isHittingItself()
{
	for(var i=1; i < snake.length; i++)
		if(snake[i].x == snake[0].x && snake[i].y == snake[0].y && snake[i].z == snake[0].z)
			return true;
	return false;
}

/*
pyshell.end(function(err){
	//if(err) throw err;
	console.log("finished Python script");
});
*/
