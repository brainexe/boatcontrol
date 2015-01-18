
module.exports = function(config, controller, output) {

    // beim Starten Licht anmachen
    console.log('enbling light');
    output.setDigital(config.pins.light.pin, 1);

    // sound: add onoff gen
    // eric pin
    config.control.generic.push(
        {pin: config.pins.sound.pin, button: config.control.sound, type: 'onoff'}
    );

};
