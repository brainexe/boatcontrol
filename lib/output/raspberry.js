
var AbstractOutput = require('./abstract_output');
var gpio = require("gpio");

var Raspberry = function() {
    this.output_pins = {};
};

Raspberry.prototype = new AbstractOutput();

Raspberry.prototype._setServo = function(pin, value) {
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
Raspberry.prototype._setPwm = function(pin, value) {
    // TODO
};

module.exports = Raspberry;
