
var util = require('../util');

const CHECK_INTERVAL = 50;
const MAX_MOVEMENT   = 10000;

module.exports = function(pin, input, output) {
    var delta = 0;
    var value = pin.defaultPosition || 0;
    setInterval(function () {
        if (delta === 0) {
            return;
        }

        var min = pin.min || 0;
        var max = pin.max || 0;

        value += delta;
        if (value < min || value > max) {
            return;
        }

        var power = util.map(
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
