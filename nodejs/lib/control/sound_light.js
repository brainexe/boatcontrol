
module.exports = function(config, input, output) {

    // beim Starten Licht anmachen
    console.log('enbling light'.yellow);
    output.setDigital(config.pins.light.pin, 1);

    // sound: add onoff generic pin
    config.control.generic.push(
        {pin: config.pins.sound.pin, button: config.control.sound, type: 'onoff'}
    );

};
