
var client = require('../redis')('input_sub');

module.exports = function(emitter) {
    client.on('message', function (channel, message) {
        // todo
        console.log('redis channel ' + channel + ": " + message);
    });

    client.subscribe('output');
};
