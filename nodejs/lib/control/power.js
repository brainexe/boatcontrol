var util = require('../util');

module.exports = function(config, controller, output) {

    controller.on(config.control.antrieb + ':move', function (data) {
        // 255: volle Fahrt vorraus
        // 128: 0 Schub
        // 0:   Rückwärts
        var servo = config.pins.motor;

        var power = util.map(255 - data.y, 0, 255, 0, 180);

        output.setServo(servo.pin, ~~power);

        servo = config.pins.ruder;
        var grad = util.map(data.x, 0, 255, 0, 180);
        output.setServo(servo.pin, ~~grad);
    });

    config.control.generic.push(
        //{button: 'dpadUp', pin: config.pins.motor.pin, type: 'press'},
        //{button: 'dpadDown', pin: config.pins.motor.pin, 'press'}
    );

};
