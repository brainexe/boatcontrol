
const AbstractOutput = require('./abstract_output');

let gpio;
let raspiPwm;
try {
    gpio = require('gpio');
    raspiPwm = require('raspi-pwm');
} catch (e) {
    console.error("[Raspberry]".red + e + " - Try to install missing npm package")
}

let pwms = {};

const Raspberry = function() {
    this.outputPins = {};
};

Raspberry.prototype = new AbstractOutput();

Raspberry.prototype._setPwm = function(pin, value) {
    let pwm;
    if (pwms[pin]) {
        pwm = pwms[pin];
    } else {
        pwm = new raspiPwm.PWM(pin);
    }

    pwm.write(value);
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
