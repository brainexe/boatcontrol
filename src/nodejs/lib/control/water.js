
var util = require('../util');

module.exports = function (config, controller, output) {

    config.control.generic.push(
        {pin: config.pins.water.pin, button: config.control.water, type: 'onoff'}
    );

    controller.on(config.control.monitors + ':move', function (data) {
        config.pins.monitors.forEach(function (monitor, i) {
            var vertical_servo = ~~util.map(data.y, 0, 255, monitor.min, monitor.max);
            var rotate_servo   = ~~util.map(data.x, 0, 255, monitor.min, monitor.max);

            output.setServo(monitor.vertical.pin, vertical_servo);
            output.setServo(monitor.rotate.pin, rotate_servo);
        });
    });
};
