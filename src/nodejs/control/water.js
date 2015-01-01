
var util = require('../lib/util');

module.exports = function (config, controller, output) {
    controller.on(config.control.water + ":press", function () {
        output.setPin(config.pins.water, 1, "water");
    });

    controller.on(config.control.water + ":release", function () {
        output.setPin(config.pins.water, 0, "water");
    });

    controller.on(config.control.monitors + ':move', function (data) {
        // todo "rotate" für jeden montor selbst berechnen
        var vertical_servo = ~~util.map(data.y, 0, 255, 0, 180);
        var rotate_servo   = ~~util.map(data.x, 0, 255, 0, 180);

        config.pins.monitors.forEach(function (monitor, i) {
            output.setServo(monitor.vertical, vertical_servo, "monitor_" + i + "_vertical");
            output.setServo(monitor.rotate, rotate_servo, "monitor_" + i + "_rotate");
        });
    });
};
