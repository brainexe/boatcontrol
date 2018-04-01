const assert = require('assert');

// enable output pin on startup
module.exports = (pinConfig, input, output) => {
    assert(pinConfig.pin > 0, "no pin defined");

    output.setDigital(pinConfig, 1);
};
