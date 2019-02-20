const
    output = require('../output'),
    input  = require('../input');

let pinState = {}; // todo use pinConfig.value instead

// toggle digital state on each press
module.exports = (pinConfig) => {
    const uniqId = pinConfig.device + pinConfig.button + pinConfig.pin;

    if (pinConfig.default) {
        output.setDigital(pinConfig, pinConfig.default);
        pinState[uniqId] = pinConfig.default;
    }

    input.on(pinConfig.button + ":press", () => {
        const value = !pinConfig.value;

        pinState[uniqId] = value;
        output.setDigital(pinConfig, value ? 1 : 0);
    });
};
