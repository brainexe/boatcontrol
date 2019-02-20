const assert = require('assert'),
      input  = require('../input'),
      output = require('../output');

let timeouts = {}; // todo use inline var instead

// when the trigger button was pressed, start blinking on output pin
// todo add amount to define max blinks
module.exports = function(pinConfig) {
    assert(pinConfig.button, "no button defined");
    assert(pinConfig.pin > 0, "no pin defined");
    assert(pinConfig.time_on > 0, "no time_on defined");
    assert(pinConfig.time_off > 0, "no time_off defined");

    output.setDigital(pinConfig, pinConfig.default);

    const uniqId = pinConfig.pin + pinConfig.device;

    function disable() {
        output.setDigital(pinConfig, 0);
        timeouts[uniqId] = setTimeout(() => {
            enablePin();
        }, pinConfig.time_off);
    }

    function enablePin() {
        output.setDigital(pinConfig, 1);
        timeouts[uniqId] = setTimeout(() => {
            disable();
        }, pinConfig.time_on)
    }

    input.on(pinConfig.button + ":press", () => {
        if (!timeouts[uniqId]) {
            // 1st click: enable and start timer
            enablePin();
        } else {
            // 2nd: stop timer and disable pin
            clearTimeout(timeouts[uniqId]);
            delete timeouts[uniqId];
            output.setDigital(pinConfig, 0);
        }
    });
};
