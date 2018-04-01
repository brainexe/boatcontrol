const util   = require('../util');
const assert = require('assert');

const CHECK_INTERVAL = 50;
const MAX_MOVEMENT   = 10000;

module.exports = function(pinConfig, input, output) {
    assert(pinConfig.min >= 0, "no min value defined");
    assert(pinConfig.max > 0, "no max value defined");
    assert(pinConfig.min < pinConfig.max, "max must be bigger then min");

    let delta = 0;
    let value = pinConfig.defaultPosition || 0;
    setInterval(function () {
        if (delta === 0) {
            return;
        }

        let min = pinConfig.min || 0;
        let max = pinConfig.max || 0;

        value += delta;
        let power = util.map(
            value,
            0,
            MAX_MOVEMENT,
            min,
            max
        );

        if (power < min || power > max) {
            return;
        }

        output.setPwm(pinConfig, power);
    }, CHECK_INTERVAL);

    input.on(pinConfig.joystick + ':move', data => {
        delta = data.x - 128;
    });
};
