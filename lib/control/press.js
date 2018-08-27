const output = require('../output');

// enable pin, when button is pressed
module.exports = function(pinConfig, input) {
    output.setDigital(pinConfig, false);

    input.on(pinConfig.button + ":press", function () {
        output.setDigital(pinConfig, true);
    });

    input.on(pinConfig.button + ":release", function () {
        output.setDigital(pinConfig, false);
    });
};
