
var util = require('../util');

module.exports = function(pin, input, output) {
    input.on(pin.joystick + ':move', function (data) {
        var vertical_servo = ~~util.map(data.y, 0, 255, 0, 180);
        var rotate_servo   = ~~util.map(data.x, 0, 255, 0, 180);

        output.setServo(pin.pinVertical, vertical_servo);
        output.setServo(pin.pinRotate,   rotate_servo);
    });
};
