
var redis  = require('../redis');
var config = require('../config');

// todo rename to redis slave
module.exports = function(emitter) {
    var client = redis('input_sub');

    client.on('message', function (channel, message) {
        var parts = message.split(':');
        if (parts[0] == config.instanceId) {
            return; // skip commands from same instance
        }

        // todo send to output
        console.log('redis channel ' + channel + ": " + message);
    });

    client.subscribe('output');
    client.subscribe('input');
};
