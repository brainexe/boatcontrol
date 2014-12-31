
var AbstractOutput = require('./abstract_output');
var gpio = require("gpio");

var Raspberry = function() {
    this.output_pins = {};
};

Raspberry.prototype = new AbstractOutput();

Raspberry._setValue = function(pin, value) {
    if (!this.output_pins[pin]) {
        this.output_pins[pin] = gpio.export(pin, {
            direction: "out"
        });
    }

    this.output_pins[pin].set(value);
};

module.exports = Raspberry;
