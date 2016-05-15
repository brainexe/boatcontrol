
var util = require('../util');

module.exports = function(pin, input, output) {
    output.setServo(pin.pin, pin.defaultPosition);

    input.on(pin.joystick + ':move', function (data) {
        // 255: rechts
        // 128: gerade
        // 0:   links
        var grad = util.map(data.x, 0, 255, pin.min || 0, pin.max || 180);

        output.setServo(pin.pin, grad);
    });
};
