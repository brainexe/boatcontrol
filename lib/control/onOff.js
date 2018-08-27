const output = require('../output');

let pinState = {}; // todo use pinConfig.value instead

// toggle digital state on each press
module.exports = function(pinConfig, input) {
    const uniqId = pinConfig.device + pinConfig.button + pinConfig.pin;

    if (pinConfig.default) {
        output.setDigital(pinConfig, pinConfig.default);
        pinState[uniqId] = pinConfig.default;
    }

    input.on(pinConfig.button + ":press", () => {
        const value = !pinState[uniqId];

        pinState[uniqId] = value;
        output.setDigital(pinConfig, value ? 1 : 0);
    });
};
