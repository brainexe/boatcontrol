
var AbstractOutput = function() {
};

AbstractOutput.prototype.setServo = function(pin, value) {
    console.log(pin, ":", value);
    if (!pin) {
        return;
    }

    this._setValue(pin, value);
};

AbstractOutput.prototype.setPin = function(pin, value) {
    console.log(pin + ": " + value);
    if (!pin) {
        return;
    }

    this._setValue(pin, value);
};

AbstractOutput.prototype._setValue = function(pin, value) {
    throw "_setValue is not implemented";
};

module.exports = AbstractOutput;
