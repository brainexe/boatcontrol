
var http        = require('http'),
    colors      = require('colors'),
    serveStatic = require('serve-static'),
    controller  = require('./controller'),
    config      = require('./config'),
    emitter     = require('./emitter');

const port = config.server.port;
const host = config.server.host;

var serve = serveStatic(__dirname + '/../browser/');

var app = http.createServer(function(req, res) {
    serve(req, res, function() {
    });
});

var io = require('socket.io').listen(app);
io.on('connection', function(socket) {
    console.log('[Server] '.green  + 'Browser client connected');

    socket.emit('config', {
        config:     config,
        controller: controller
    });

    socket.on('input', function(event, data) {
        emitter.emit(event, data);
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

    emitter.on('output', function(value) {
        socket.emit('output', value);
    });
});

console.log(colors.green('[Server] Start server at http://' + host + ':' + port));

app.listen(port, host);
