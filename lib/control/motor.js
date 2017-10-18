
var util = require('../util');

module.exports = function(pin, input, output) {
    output.setServo(pin.pin, pin.defaultPosition);

    input.on(pin.joystick + ':move', function (data) {
        // 255: volle Fahrt vorraus
        // 128: 0 Schub
        // 0:   Rückwärts
        var power = util.map(
            data.y,
            0,
            255,
            pin.min || 0,
            pin.max || 180
        );

        output.setServo(pin.pin, power);
    });
};
