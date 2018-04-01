const assert = require('assert');
let pinState = {};

// when the trigger button was pressed, start blinking on output pin
// todo add amount to define max blinks
module.exports = function(pinConfig, input, output) {
    assert(pinConfig.button, "no button defined");
    assert(pinConfig.pin > 0, "no pin defined");
    assert(pinConfig.time_on > 0, "no time_on defined");
    assert(pinConfig.time_off > 0, "no time_off defined");

    output.setDigital(pinConfig, pinConfig.default);

    const uniqId = pinConfig.pin + pinConfig.device;

    function disable() {
        output.setDigital(pinConfig, 0);
        pinState[uniqId] = setTimeout(() => {
            enablePin();
        }, pinConfig.time_off);
    }

    function enablePin() {
        output.setDigital(pinConfig, 1);
        pinState[uniqId] = setTimeout(() => {
            disable();
        }, pinConfig.time_on)
    }

    input.on(pinConfig.button + ":press", () => {
        if (!pinState[uniqId]) {
            // 1st click: enable and start timer
            enablePin();
        } else {
            // 2nd: stop timer and disable pin
            clearTimeout(pinState[uniqId]);
            pinState[uniqId] = 0;
            output.setDigital(pinConfig, 0);
        }
    });
};
