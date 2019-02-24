const
    config  = require('./config'),
    emitter = require('./emitter');

for (let inputType in config.input) {
    switch (inputType) {
        case 'dualShock3':
        case 'dualShock4':
            require('./input/controller')(emitter, inputType, config.input[inputType]);
            break;
        case 'gamepad':
            require('./input/gamepad')(emitter, config.input[inputType]);
            break;
        default:
            console.error('[Error] unknown input type: '.red + inputType.yellow);
    }
}

module.exports = emitter;
