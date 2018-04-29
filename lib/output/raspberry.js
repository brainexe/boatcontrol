
const gpio = require('gpio');
// todo install proper library
//const pwm = require('raspi-pwm');
const AbstractOutput = require('./abstract_output');

let pwms = {};

const Raspberry = function() {
    this.outputPins = {};
};

Raspberry.prototype = new AbstractOutput();

Raspberry.prototype._setPwm = function(pin, value) {
    let pinPwm;

    if (pwms[pin]) {
        pinPwm = pwms[pin];
    } else {
        pinPwm = new pwm.PWM(pin);
    }

    pinPwm.write(value);
};

Raspberry.prototype._setDigital = function(pin, value) {
    if (!this.outputPins[pin]) {
        this.outputPins[pin] = gpio.export(pin, {
            direction: "out"
        });
    }

    this.outputPins[pin].set(value);
};

Raspberry.prototype._setAnalog = function(pin, value) {
    // TODO
};

module.exports = Raspberry;
