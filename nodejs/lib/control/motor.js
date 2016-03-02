
var util = require('../util');

module.exports = function(pin, input, output) {
    input.on(pin.joystick + ':move', function (data) {
        // 255: volle Fahrt vorraus
        // 128: 0 Schub
        // 0:   Rückwärts
        var power = util.map(255 - data.y, 0, 255, 0, 180);
        console.log('set', pin.pin, power, ~~power)
        output.setServo(pin.pin, ~~power);
    });
};
