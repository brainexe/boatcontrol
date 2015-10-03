
var util = require('../util');

module.exports = function (config, input, output) {

    config.control.generic.push(
        {pin: config.pins.water.pin, button: config.control.water, type: 'onoff'}
    );

    input.on(config.control.monitors + ':move', function (data) {
        config.pins.monitors.forEach(function (monitor, i) {
            var vertical_servo = ~~util.map(data.y, 0, 255, 0, 180);
            var rotate_servo   = ~~util.map(data.x, 0, 255, 0, 180);

            output.setServo(monitor.vertical.pin, vertical_servo);
            output.setServo(monitor.rotate.pin, rotate_servo);
        });
    });
};
