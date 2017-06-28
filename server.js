
var http        = require('http'),
    colors      = require('colors'),
    serveStatic = require('serve-static'),
    controller  = require('./lib/controller'),
    config      = require('./lib/config'),
    metric      = require('./lib/metric'),
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

var ops = metric.counter({
    name: 'messages'
});
var connectedSockets = metric.counter({
    name: 'connected sockets'
});

var io = require('socket.io').listen(app);
io.on('connection', function(socket) {
    console.log('Browser client connected');
    connectedSockets.inc();
    redisPub.hgetall('pins', function (error, pins) {
        for (var pin in pins) {
            pins[pin] = pins[pin].split('-');
        }
        socket.emit('config', {
            config:     config,
            controller: controller,
            pins:       pins
        });
    });

    socket.on('input', function(event) {
        redisPub.publish('input', event);
    });

    socket.on('timePing', function(time, fn) {
        fn();
    });

    socket.on('disconnect', function() {
        console.log('Browser client disconnected');
        connectedSockets.dec();
    });

    redisSub.subscribe('output');
    redisSub.subscribe('event');
    redisSub.subscribe('debug');
    redisSub.on('message', function(channel, message) {
        socket.emit(channel, message);
        ops.inc();
    });
});

console.log(colors.green('Start server at http://' + host + ':' + port));

app.listen(port, host);
