var util = require('../util');

module.exports = function(config, controller, output) {

    controller.on(config.control.antrieb + ':move', function (data) {
        // 255: volle Fahrt vorraus
        // 128: 0 Schub
        // 0: Rückwärts
        var servo = config.pins.motor;
        var power = util.map(-data.y, -255, 0, servo.min, servo.max);
        output.setServo(servo.pin, ~~power, "motor");

        servo = config.pins.ruder;
        var grad = util.map(data.x, 0, 255, servo.min, servo.max);
        output.setServo(servo.pin, ~~grad, "ruder");
    });

};
