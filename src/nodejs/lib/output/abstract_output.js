
var AbstractOutput = function() {
};

AbstractOutput.prototype.setServo = function(pin, value, reason) {
    console.log(pin + ": " + value, reason);
    if (!pin) {
        return;
    }

    this._setServo(pin, value);
};

AbstractOutput.prototype.setPin = function(pin, value, reason) {
    console.log(pin + ": " + value, reason);
    if (!pin) {
        return;
    }

    this._setPin(pin, value);
};

AbstractOutput.prototype._setServo = function(pin, value) {
    throw "_setServo is not implemented";
};
AbstractOutput.prototype._setPin = function(pin, value) {
    throw "_setPin is not implemented";
};

module.exports = AbstractOutput;
