const assert = require('assert'),
      output = require('../output');

// increase PWM value when button is pressed

module.exports = (pinConfig, input) => {
    assert(pinConfig.button, "no button defined");
    assert(pinConfig.pin > 0, "no pin defined");

    const speed    = pinConfig.speed || 30;
    const minValue = pinConfig.min   || 0;
    const maxValue = pinConfig.max   || 255;

    let timer = null;
    let value;
    input.on(pinConfig.button + ":press", () => {
        if (value) {
            output.setAnalog(pinConfig, 0);
            value = 0;
            return;
        }

        value = minValue;
        timer = setInterval(() => {
            if (value >= maxValue) {
                clearInterval(timer);
                timer = null;
                return;
            }
            value++;
            output.setAnalog(pinConfig, value);
        }, speed);
    });

    input.on(pinConfig.button + ":release", () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    });
};
