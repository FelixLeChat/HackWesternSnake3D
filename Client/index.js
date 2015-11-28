var SerialPort = require("serialport").SerialPort;

var serialPort = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600
});

serialPort.on("open", function () {
  console.log('open Serial Port');

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

		serialPort.write(new Buffer('4','0,0,0'), function(err, results) {
		    console.log('err ' + err);
		    console.log('results ' + results);
		});
	});
});