
var config = require("../config");

// todo implement queue here
var AbstractOutput = function() {
    this.states = {};
};

AbstractOutput.prototype.setServo = function(pin, value) {
    if (!pin) {
        return;
    }

    if (this.states[pin] && this.states[pin] != value) {
        return;
    } else {
        this.states[pin] = value;
    }

    if (config.servo_as_analog) { // todo needed?
        value *= 2;
        this._setAnalog(pin, Math.min(value, 255));
    } else {
        this._setServo(pin, value);
    }
};

AbstractOutput.prototype.setDigital = function(pin, value) {
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

module.exports = AbstractOutput;
