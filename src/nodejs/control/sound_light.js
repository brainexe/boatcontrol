module.exports = function(config, controller, output) {
    if (config.debug) {
        console.log('enbling light');
        output.setPin(config.pins.light, 1);
    }

    //output.setPin(config.pins.sound, 1);
};
