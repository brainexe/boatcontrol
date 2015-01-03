
module.exports = function(config, controller, output) {

    // beim Starten Licht anmachen
    console.log('enbling light');
    output.setPin(config.pins.light.pin, 1, "light");

    // sound: add onoff gen
    // eric pin
    config.control.generic.push(
        {pin: config.pins.sound.pin, button: config.control.sound, type: 'onoff'}
    );

};
