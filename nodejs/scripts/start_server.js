var http        = require('http'),
    colors      = require('colors'),
    fs          = require('fs'),
    controller  = require('../lib/controller'),
    config      = require('../lib/config'),
    redis       = require('../lib/redis'),
    finalhandler = require('finalhandler'),
    serveStatic = require('serve-static');

config.output = ['redis'];
config.input  = [];

var input   = require('../lib/input/redis'),
    output  = require('../lib/output/redis');

var port = config.server.port;

var redis_client = redis('browser-subscribe');
var serve = serveStatic(__dirname + '/../../browser/');

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

    redis_client.subscribe('output');
    redis_client.on('message', function(channell, message) {
        var parts = message.split(':');
        socket.emit('output', parts);
    });
});

console.log(colors.green('Start server at http://localhost:'+port));

app.listen(port);
