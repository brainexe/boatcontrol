
var redis  = require('../redis');
var config = require('../config');

module.exports = function(emitter) {
    var sub = redis('sub');
    var pub = redis('pub');

    sub.on('message', function (channel, message) {
        if (channel == 'ouput') {
            var parts = message.split(':');
            if (parts[0] == config.instanceId) {
                return; // skip commands from same instance
            }

            // todo send to output
        } else if (channel == 'input') {
            emitter.emit(message);
        }
    });

    emitter.onAny(function(event, parameters) {
        var string = config.instanceId + ':' + event;
        if (parameters) {
            string += ':' + JSON.stringify(parameters)
        }
        pub.publish('event', string);
    });

    emitter.on('debug', function(message) {
        pub.publish('debug', message);
    });

    sub.subscribe('output');
    sub.subscribe('input');
};
