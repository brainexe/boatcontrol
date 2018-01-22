
const util = require('../util');
const controller = require('../controller');
const assert = require('assert');

module.exports = function(pin, input, output) {
    assert(pin.min >= 0, "no min value defined");
    assert(pin.max > 0, "no max value defined");
    assert(pin.min < pin.max, "max must be bigger then min");

    // set default value at startup
    pin.defaultValue = (pin.max + pin.min) / 2;
    output.setServo(pin.pin, pin.defaultValue);

    input.on(pin.joystick + ':move', function (data) {
        if (pin.buffer > 0) {
            if (data.y > pin.defaultValue + pin.buffer) {
                data.y -= pin.buffer;
            } else if (data.y < pin.defaultValue - pin.buffer) {
                data.y += pin.buffer;
            }
        }

        let power = util.map(
            data.y,
            controller.JOYSTICK_MIN,
            controller.JOYSTICK_MAX,
            pin.min,
            pin.max
        );

        output.setServo(pin.pin, power);
    });
};
