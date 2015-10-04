var http        = require('http'),
    colors      = require('colors'),
    fs          = require('fs'),
    controller  = require('../lib/controller'),
    config      = require('../lib/config'),
    redis       = require('../lib/redis');

config.output = ['redis'];
config.input  = [];

var input   = require('../lib/input/redis'),
    output  = require('../lib/output/redis');

var port = config.server.port;

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    var index = fs.readFileSync(__dirname + '/../../browser/index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

var io = require('socket.io').listen(app);

io.on('connection', function(socket) {
    socket.emit('config', {
        config:     config,
        controller: controller
    });
});

console.log(colors.green('Start server at http://localhost:'+port));

app.listen(port);
