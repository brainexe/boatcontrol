
var http        = require('http'),
    colors      = require('colors'),
    serveStatic = require('serve-static'),
    controller  = require('./controller'),
    config      = require('./config'),
    redis       = require('./redis');
    debug       = require('debug')('Server'),
    emitter     = require('./emitter');

var port = config.server.port;
var host = config.server.host;

var redisPub = redis('pub');
var redisSub = redis('sub');
var serve = serveStatic(__dirname + '/../browser/');

var app = http.createServer(function(req, res) {
    serve(req, res, function() {
    });
});

var io = require('socket.io').listen(app);
io.on('connection', function(socket) {
    console.log('[Server] '.green  + 'Browser client connected');
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
        emitter.emit(event);
    });

    socket.on('timePing', function(time, fn) {
        fn();
    });

    socket.on('disconnect', function() {
        console.log('[Server] '.green  + 'Browser client disconnected');
    });

    emitter.onAny(function(event, parameters) {
        var string = event;
        if (parameters) {
            string += ':' + JSON.stringify(parameters)
        }
        socket.emit('event', string);
    });

    redisSub.subscribe('output');
    redisSub.on('message', function(channel, message) {
        socket.emit(channel, message);
    });
});

console.log(colors.green('[Server] Start server at http://' + host + ':' + port));

app.listen(port, host);
