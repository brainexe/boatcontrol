
const util = require('../util');
const controller = require('../controller');
const assert = require('assert');

module.exports = function(pinConfig, input, output) {
    assert(pinConfig.min >= 0, "no min value defined");
    assert(pinConfig.max > 0, "no max value defined");
    assert(pinConfig.min < pinConfig.max, "max must be bigger then min");

    // set default value at startup
    pinConfig.defaultValue = pinConfig.defaultValue || (pinConfig.max + pinConfig.min) / 2;
    output.setPwm(pinConfig, pinConfig.defaultValue);

    input.on(pinConfig.joystick + ':move', data => {
        // 255: right
        // 128: straight
        // 0:   left
        let grad = util.map(
            data.x,
            controller.JOYSTICK_MIN,
            controller.JOYSTICK_MAX,
            pinConfig.min,
            pinConfig.max
        );

        output.setPwm(pinConfig, grad);
    });
};
