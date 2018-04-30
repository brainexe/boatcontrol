const assert = require('assert');
let timers = {};

// when the button was pressed, enable the pin for X ms
module.exports = (pinConfig, input, output) => {
    assert(pinConfig.button, "no button defined");
    assert(pinConfig.pin > 0, "no pin defined");
    assert(pinConfig.time > 0, "no time defined");

    output.setDigital(pinConfig, pinConfig.default);
    const uniqId = pinConfig.device + pinConfig.button + pinConfig.pin;

    input.on(pinConfig.button + ":press", () => {
        output.setDigital(pinConfig, true);

        if (timers[uniqId]) {
            clearTimeout(timers[pinConfig.pin]);
        }

        timers[pinConfig.pin] = setTimeout(() => {
            delete timers[uniqId];
            output.setDigital(pinConfig, false);
        }, pinConfig.time);
    });
};
