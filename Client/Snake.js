var SerialPort = require("serialport").SerialPort;
var net = require('net');

var server = net.createServer(function(socket){
    socket.setEncoding("utf8")
    socket.write('Echo server\r\n');
    socket.pipe(socket);
    socket.on('data', function(data){

		data = decodeURIComponent(escape(data.toLowerCase()));
		data = data.replace(/(\r\n|\n|\r)/gm,"");
    	console.log(data);
    	switch(data)
		{
			case "fist":
				if(direction.z != -1)
				{
					direction = {x:0,y:0,z:1};
					Update();
				}
				break;
			case "fingers_spread":
				if(direction.z != 1)
				{
					direction = {x:0,y:0,z:-1};
					Update();
				}
				break;
			case "wave_in":
				if(direction.y != 1)
				{
					direction = {x:0,y:-1,z:0};
					Update();
				}
				break;
			case "wave_out":
				if(direction.y != -1)
				{
					direction = {x:0,y:1,z:0};
					Update();
				}
				break;
			/*case "forward":
				if(direction.x != 1)
				{
					direction = {x:1,y:0,z:0};
					Update();
				}
				break;
			case "backward":
				if(direction.x != -1)
				{
					direction = {x:1,y:0,z:0};
					Update();
				}
				break;*/
		};
    });

})

server.listen(1337, '127.0.0.1', function(data){
  console.log(data)
});


var serialPort = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600
});

var canWrite = false;


serialPort.on("open", function () {
  console.log('open Serial Port');
  canWrite = true;
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
function Update()
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

	end = snakeCopy[snakeCopy.length-1];

	if(isHittingItself())
	{
		console.log(snake);
		lifes --;
		serialPort.write("" + lifes);
		// reset snake
		snake = [];
		console.log("lifes left : %s", lifes);
		console.log(snake);

		if(lifes == 0)
		{
		}
	}
	else
	{
		serialPort.write(total);
		console.log("sending : %s", total);
	}
  }
}


function isHittingItself()
{
	for(var i=1; i < snake.length; i++)
		if(snake[i].x == snake[0].x && snake[i].y == snake[0].y && snake[i].z == snake[0].z)
			return true;
	return false;
}

Update();