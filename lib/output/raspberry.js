
const AbstractOutput = require('./abstract_output');
const gpio = require("gpio");
const Raspberry = function() {
    this.output_pins = {};
};

Raspberry.prototype = new AbstractOutput();

Raspberry.prototype._setPwm = function(pin, value) {
    if (!this.output_pins[pin]) {
        this.output_pins[pin] = gpio.export(pin, {
            direction: "out"
        });
    }

    // todo servo richtig ansteuern!
    //this.output_pins[pin].set(value);
};

Raspberry.prototype._setDigital = function(pin, value) {
    if (!this.output_pins[pin]) {
        this.output_pins[pin] = gpio.export(pin, {
            direction: "out"
        });
    }

    this.output_pins[pin].set(value);
};

Raspberry.prototype._setAnalog = function(pin, value) {
    // TODO
};

module.exports = Raspberry;
