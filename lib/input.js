const
    config  = require('./config'),
    emitter = require('./emitter');

for (let inputType in config.input) {
    switch (inputType) {
        case 'dualShock3':
        case 'dualShock4':
            let input = require('./input/controller');
            input = input(emitter, inputType, config.input[inputType]);
            break;
        default:
            console.error('[Error] unknown input type: '.red + inputType.yellow);
    }
}

module.exports = emitter;
