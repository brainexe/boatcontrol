
var http        = require('http'),
    colors      = require('colors'),
    fs          = require('fs'),
    finalhandler = require('finalhandler'),
    serveStatic = require('serve-static'),
    controller  = require('./lib/controller'),
    config      = require('./lib/config'),
    redis       = require('./lib/redis');

config.output = ['redis'];
config.input  = [];

var input   = require('./lib/input/redis'),
    output  = require('./lib/output/redis');

var port = config.server.port;

var redisPub = redis('pub');
var redisSub = redis('sub');
var serve = serveStatic(__dirname + '/../browser/');

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    var done = finalhandler(req, res);
    serve(req, res, done);
});

var io = require('socket.io').listen(app);
io.on('connection', function(socket) {
    socket.emit('config', {
        config:     config,
        controller: controller
    });

    socket.on('input', function(event) {
        redisPub.publish('input', event);
    });

    redisSub.subscribe('output');
    redisSub.subscribe('event');
    redisSub.subscribe('debug');
    redisSub.on('message', function(channel, message) {
        socket.emit(channel, message);
    });
});

console.log(colors.green('Start server at http://localhost:'+port));

app.listen(port);
