
const AbstractOutput = require('./abstract_output');

let gpio;
let raspiPwm;
let raspiAvailable = false;
try {
    gpio = require('gpio');
    raspiPwm = require('raspi-pwm');
    raspiAvailable = true;
} catch (e) {
    console.error("[Raspberry]".red + e + " - Try to install missing npm package")
}

class Raspberry extends AbstractOutput {
    constructor() {
        super();
        this.outputPins = {};
        this.pwmPins    = {};
    }

    _setPwm(pin, value) {
        let pwm;
        if (this.pwmPins[pin]) {
            pwm = this.pwmPins[pin];
        } else {
            pwm = new raspiPwm.PWM(pin);
        }

        pwm.write(value);
    }

    _setDigital(pin, value) {
        if (!raspiAvailable) {
            return;
        }

        if (!this.outputPins[pin]) {
            this.outputPins[pin] = gpio.export(pin, {
                direction: 'out'
            });
        }

        this.outputPins[pin].set(value);
    }

    _setAnalog(pin, value) {
        this._setPwm(pin, value)
    };
}

module.exports = Raspberry;
