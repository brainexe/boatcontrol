var Emitter = require('events').EventEmitter, // todo emitter2 + wildcard
    config  = require('./config');

var globalEmitter = new Emitter();

module.exports = function() {
    var inputType;
    var input;

    config.input.forEach(function(inputType) {
        switch (inputType) {
            case 'redis':
                input = require('./input/redis');
                input = input(globalEmitter);
                break;
            case 'dualShock3':
            case 'dualShock4':
                input = require('./input/dualShock');
                input = input(globalEmitter, inputType);
                break;
            default:
                console.log('unknown input type: ' + input);
        }
    });

    return globalEmitter;
};
