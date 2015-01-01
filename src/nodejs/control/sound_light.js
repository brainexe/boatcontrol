
module.exports = function(config, controller, output) {

    // beim Starten Licht anmachen
    console.log('enbling light');
    output.setPin(config.pins.light, 1, "light");

    controller.on(config.control.sound + ":press", function () {
        output.setPin(config.pins.sound, 1, "sound");
    });
    controller.on(config.control.sound + ":release", function () {
        output.setPin(config.pins.sound, 0, "sound");
    });

};
