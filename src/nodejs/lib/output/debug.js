
var AbstractOutput = require('./abstract_output');

var Debug = function() {
};

Debug.prototype = new AbstractOutput();

Debug.prototype._setDigital = function(pin, value) {
};

Debug.prototype._setServo = function(pin, value) {
};

Debug.prototype._setAnalog = function(pin, value) {
};

Debug.prototype._setPwm = function(pin, value) {
};

module.exports = Debug;
