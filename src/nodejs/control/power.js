var util = require('../lib/util');

module.exports = function(config, controller, output) {

    controller.on(config.control.antrieb + ':move', function (data) {
        // 255: volle Fahrt vorraus
        // 128: 0 Schub
        // 0: Rückwärts
        var power = util.map(-data.y, -255, 0, 0, 180);
        output.setServo(config.pins.motor, ~~power, "motor");

        // todo 0-255 -> richtige Grad Anzahl + Kalibrierung!
        var grad = util.map(data.x, 0, 255, 0, 180);
        output.setServo(config.pins.ruder, ~~grad, "ruder");
    });

};
