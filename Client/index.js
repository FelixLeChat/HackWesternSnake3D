var SerialPort = require("serialport").SerialPort;
var Myo = require("node-myo");

var serialPort = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600
});

var canWrite = false;

Myo.connect("com.westernhacks.ledbox");

Myo.on("connected", function(data, timestamp) {
  console.log("Myo successfully connected. Data: " + JSON.stringify(data) + ". Timestamp: " + timestamp + ".");
});

serialPort.on("open", function () {
  console.log('open Serial Port');
  canWrite = true;

  /*serialPort.on('data', function(data) {
    console.log('data received: ' + data);
  });*/

  /*serialPort.write(new Buffer('4','ascii'), function(err, results) {
    console.log('err ' + err);
    console.log('results ' + results);
  });*/
});


var ws = require("nodejs-websocket");
var wsConnected = ws.connect("ws://websocket-nodejs.herokuapp.com", function(wss)
{
	console.log("connect to websocket");
});

wsConnected.on('connect', function() {
	console.log('Connection established');

	wsConnected.on('text', function incoming(message) {
		// when text is received from Websocket Server
		console.log('received: %s', message);

		if(canWrite)
			serialPort.write(message, function(err, results) {
		    	console.log('err ' + err);
		    	console.log('results ' + results);
			});
	});
});
