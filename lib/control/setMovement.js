const util = require('../util');

const CHECK_INTERVAL = 50;
const MAX_MOVEMENT   = 10000;

module.exports = function(pin, input, output) {
    let delta = 0;
    let value = pin.defaultPosition || 0;
    setInterval(function () {
        if (delta === 0) {
            return;
        }

        let min = pin.min || 0;
        let max = pin.max || 0;

        value += delta;
        if (value < min || value > max) {
            return;
        }

        let power = util.map(
            value,
            0,
            MAX_MOVEMENT,
            min,
            max
        );

        output.setServo(pin.pin, power);
    }, CHECK_INTERVAL);

    input.on(pin.joystick + ':move', function (data) {
        delta = data.x - 128;
    });
};
