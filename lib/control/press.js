const
    output = require('../output'),
    input  = require('../input');

// enable pin, when button is pressed
module.exports = (pinConfig) => {
    output.setDigital(pinConfig, false);

    input.on(pinConfig.button + ":press", () => {
        output.setDigital(pinConfig, true);
    });

    input.on(pinConfig.button + ":release", () => {
        output.setDigital(pinConfig, false);
    });
};
