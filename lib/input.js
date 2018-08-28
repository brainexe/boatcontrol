const
    config  = require('./config'),
    emitter = require('./emitter');

let input;
config.input.forEach(inputType => {
    switch (inputType) {
        case 'dualShock3':
        case 'dualShock4':
            input = require('./input/controller');
            input = input(emitter, inputType);
            break;
        default:
            console.error('[Error] unknown input type: '.red + inputType.yellow);
    }
});

module.exports = emitter;
