var
    config  = require('./config'),
    emitter = require('./emitter');

module.exports = function() {
    var input;

    config.input.forEach(function(inputType) {
        switch (inputType) {
            case 'redis':
                input = require('./input/redis');
                input = input(emitter);
                break;
            case 'dualShock3':
            case 'dualShock4':
                input = require('./input/controller');
                input = input(emitter, inputType);
                break;
            case 'serial':
                input = require('./input/serial');
                input = input(emitter);
                break;
            default:
                console.log('unknown input type: '.red + inputType.yellow);
        }
    });

    return emitter;
};
