
var AbstractOutput = require('./abstract_output');

// todo
var Metawear = function() {
};

Metawear.prototype = new AbstractOutput();

Metawear.prototype._setServo = function(pin, value) {
};

Metawear.prototype._setDigital = function(pin, value) {
};

Metawear.prototype._setAnalog = function(pin, value) {
};

Metawear.prototype._setPwm = function(pin, value) {
};

module.exports = Metawear;
