const util   = require('../util');
const assert = require('assert');

const CHECK_INTERVAL = 30;
const MAX_MOVEMENT   = 20000;

module.exports = function(pinConfig, input, output) {
    assert(pinConfig.min >= 0, "no min value defined");
    assert(pinConfig.max > 0, "no max value defined");
    assert(pinConfig.min < pinConfig.max, "max must be bigger then min");

    let defaultPosition = pinConfig.defaultPosition || 0;
    let direction = pinConfig.direction || 'x';
    let delta = 0;
    let value = defaultPosition * MAX_MOVEMENT / 2;
    let min   = pinConfig.min;
    let max   = pinConfig.max;

    // move to default position
    output.setPwm(pinConfig, defaultPosition);

    setInterval(function () {
        if (delta === 0) {
            return;
        }

        value += delta;
        let power = util.map(
            value,
            0,
            MAX_MOVEMENT,
            min,
            max
        );

        if (power <= min || power >= max) {
            // out of range...revert current operation
            value -= delta;
            return;
        }

        output.setPwm(pinConfig, power);
    }, CHECK_INTERVAL);

    input.on(pinConfig.joystick + ':move', data => {
        delta = data[direction] - 128;
    });
};
