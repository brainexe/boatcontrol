
var client = require('../redis')('input_sub');

module.exports = function(emitter) {
    client.on('message', function (channel, message) {
        // todo send to output
        console.log('redis channel ' + channel + ": " + message);
    });

    client.subscribe('output');
    client.subscribe('input');
};
