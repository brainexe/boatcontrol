
const http      = require('http'),
    serveStatic = require('serve-static'),
    controller  = require('./controller'),
    config      = require('./config'),
    emitter     = require('./emitter'),
    serve       = serveStatic(__dirname + '/../browser/');

let app = http.createServer(function(req, res) {
    serve(req, res, () => {
    });
});

let io = require('socket.io').listen(app);
io.on('connection', function(socket) {
    console.log('[Server] '.green  + 'Browser client connected');

    socket.emit('config', {
        config:     config,
        controller: controller
    });

    socket.on('input', (event, data) => {
        emitter.emit(event, data);
    });

    socket.on('timePing', (time, fn) => {
        fn();
    });

    let eventListener = (event, parameters) => {
        let string = event;
        if (parameters) {
            string += ':' + JSON.stringify(parameters)
        }
        socket.emit('event', string);
    };

    let pinChange = value => {
        socket.emit('pinChange', value);
    };

    emitter.onAny(eventListener);
    emitter.on('pinChange', pinChange);

    socket.on('disconnect', () => {
        console.log('[Server] '.green  + 'Browser client disconnected');
        emitter.offAny(eventListener);
        emitter.off('pinChange', pinChange)
    });
});

module.exports = app;
