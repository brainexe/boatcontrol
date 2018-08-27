const util   = require('../util');
const assert = require('assert');
const output = require('../output');

const CHECK_INTERVAL = 30;
const MAX_MOVEMENT   = 20000;

module.exports = function(pinConfig, input) {
    assert(pinConfig.min >= 0, "no min value defined");
    assert(pinConfig.max > 0, "no max value defined");
    assert(pinConfig.min < pinConfig.max, "max must be bigger then min");

    let direction = pinConfig.direction || 'x';
    let delta = 0;
    let min   = pinConfig.min;
    let max   = pinConfig.max;

    // move to default position
    let defaultPosition = pinConfig.defaultPosition || 0;
    let value = util.map(defaultPosition, pinConfig.min, pinConfig.max, 0, MAX_MOVEMENT);

    output.setPwm(pinConfig, defaultPosition);

    setInterval(() => {
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
