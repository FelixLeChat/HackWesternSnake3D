/*var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});*/


var ws = require("nodejs-websocket");

var server = ws.createServer(function (conn) 
{
    conn.on("text", function (str) 
    {
        broadcast(str);
    });

    conn.on("close", function (code, reason) 
    {
    });

}).listen(8081);

function broadcast(str) {
	server.connections.forEach(function (connection) {
		connection.sendText(str)
	})
}