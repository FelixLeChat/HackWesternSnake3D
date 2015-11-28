var SerialPort = require("serialport").SerialPort;
var ws = require("nodejs-websocket");
var wsConnected = ws.connect("ws://websocket-nodejs.herokuapp.com", function(wss)
{
	console.log("connect to websocket");
});

wsConnected.on('connect', function() {
	console.log('Connection established');
	
	wsConnected.on('text', function incoming(message) {
	console.log('received: %s', message);
});

wsConnected.sendText("test");

});

/*var serialPort = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600
});

serialPort.on("open", function () {
  console.log('open');

  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
  });

  serialPort.write(new Buffer('4','ascii'), function(err, results) {
    console.log('err ' + err);
    console.log('results ' + results);
  });
});*/



