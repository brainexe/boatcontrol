
var util = require('../util');

module.exports = function(pin, input, output) {
    input.on(pin.joystick + ':move', function (data) {
        // 255: rechts
        // 128: 0 gerade
        // 0:   links
        var grad = util.map(data.x, 0, 255, 0, 180);
        output.setServo(pin.pin, ~~grad);
    });
};
