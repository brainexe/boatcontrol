
var util = require('../util');

const CHECK_INTERVAL = 100;
const MAX_MOVEMENT   = 100000;

module.exports = function(pin, input, output) {
    var delta = 0;
    var value = pin.defaultPosition || 0;
    setInterval(function () {
        if (delta === 0) {
            return;
        }

        value += delta;
        var power = util.map(
            value,
            0,
            MAX_MOVEMENT,
            pin.min || 0,
            pin.max || 180
        );

        output.setServo(pin.pin, power);
    }, CHECK_INTERVAL);

    input.on(pin.joystick + ':move', function (data) {
        delta = data.x;
    });
};
