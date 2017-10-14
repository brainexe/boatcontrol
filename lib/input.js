var
    config  = require('./config'),
    emitter = require('./emitter');

module.exports = function() {
    var input;

    config.input.forEach(function(inputType) {
        switch (inputType) {
            case 'dualShock3':
            case 'dualShock4':
                input = require('./input/controller');
                input = input(emitter, inputType);
                break;
            default:
                console.log('unknown input type: '.red + inputType.yellow);
        }
    });

    return emitter;
};
