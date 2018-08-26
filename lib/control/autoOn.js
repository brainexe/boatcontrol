const assert = require('assert'),
      output = require('../output');

// enable output pin on startup
module.exports = (pinConfig) => {
    assert(pinConfig.pin > 0, "no pin defined");

    output.setDigital(pinConfig, 1);
};
