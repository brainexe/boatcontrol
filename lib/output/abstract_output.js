
var config = require("../config");

var AbstractOutput = function() {
    this.states = {};
    this.type   = '';
};

AbstractOutput.prototype.setType = function(type) {
    this.type = type;
};

AbstractOutput.prototype.setServo = function(pin, value) {
    pin = this._checkType(pin);
    if (!pin) {
        return;
    }

    value = ~~value;
    if (this.states[pin] && this.states[pin] == value) {
        return;
    } else {
        this.states[pin] = value;
    }

    this._setServo(pin, value);
};

AbstractOutput.prototype.setDigital = function(pin, value) {
    pin = this._checkType(pin);
    if (!pin) {
        return;
    }

    this._setDigital(pin, ~~value);
};

AbstractOutput.prototype.setAnalog = function(pin, value) {
    if (!pin) {
        return;
    }

    this._setAnalog(pin, value);
};

AbstractOutput.prototype.setPwm = function(pin, value) {
    pin = this._checkType(pin);
    if (!pin) {
        return;
    }

    this._setPwm(pin, value);
};

AbstractOutput.prototype._setServo = function(pin, value) {
    throw "_setServo is not implemented";
};

AbstractOutput.prototype._setDigital = function(pin, value) {
    throw "_setDigital is not implemented";
};

AbstractOutput.prototype._setAnalog = function(pin, value) {
    throw "_setAnalog is not implemented";
};

AbstractOutput.prototype._setPwm = function(pin, value) {
    throw "_setPwm is not implemented";
};

/**
 * checks if pin is set and device is matching
 * @param option
 * @returns Number
 */
AbstractOutput.prototype._checkType = function(option) {
    if (!option) {
        return null;
    }

    if (typeof option == "object") {
        var device = option.device;
        if (device && device != this.type && this.type != 'debug') {
            return null;
        }

        return option.pin;
    }

    return option;
};

module.exports = AbstractOutput;
