var Emitter = require('events').EventEmitter, // emitter2 + wildcard
    config  = require('./config');

var globalEmitter = new Emitter();

module.exports = function() {
    var inputType = 'dualShock3'; // todo use config.input
    var input;

    switch (inputType) {
        default:
            input = require('./input/dualShock');
            input = input(globalEmitter, inputType);
    }

    return globalEmitter;
};
