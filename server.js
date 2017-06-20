
var http        = require('http'),
    colors      = require('colors'),
    serveStatic = require('serve-static'),
    controller  = require('./lib/controller'),
    config      = require('./lib/config'),
    redis       = require('./lib/redis');

var port = config.server.port;
var host = config.server.host;

var redisPub = redis('pub');
var redisSub = redis('sub');
var serve = serveStatic(__dirname + '/browser/');

var app = http.createServer(function(req, res) {
    serve(req, res, function() {
    });
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

console.log(colors.green('Start server at http://' + host + ':' + port));

app.listen(port, host);
