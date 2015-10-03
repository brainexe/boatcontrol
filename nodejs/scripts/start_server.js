var http    = require('http'),
    colors  = require('colors'),
    fs      = require('fs'),
    config  = require('../lib/config'),
    redis   = require('../lib/redis'),
    index   = fs.readFileSync(__dirname + '/../../browser/index.html');

config.output = ['redis'];
config.input  = [];

var input   = require('../lib/input/redis'),
    output  = require('../lib/output/redis');

var port = config.server.port;

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

var io = require('socket.io').listen(app);

function sendTime() {
    io.emit('time', { time: new Date().toJSON() });
}

setInterval(sendTime, 10000);

io.on('connection', function(socket) {
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });
    socket.emit('config', config);
});

console.log(colors.green('Start server at http://localhost:'+port));

app.listen(port);