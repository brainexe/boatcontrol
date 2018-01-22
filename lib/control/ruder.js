
const util = require('../util');
const controller = require('../controller');

module.exports = function(pin, input, output) {
    output.setServo(pin.pin, pin.defaultPosition);

    input.on(pin.joystick + ':move', function (data) {
        // 255: right
        // 128: straight
        // 0:   left
        let grad = util.map(
            data.x,
            controller.JOYSTICK_MIN,
            controller.JOYSTICK_MAX,
            pin.min,
            pin.max
        );

        output.setServo(pin.pin, grad);
    });
};
