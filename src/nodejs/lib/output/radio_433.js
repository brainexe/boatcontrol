
var AbstractOutput = require('./abstract_output');

var Radio433 = function() {
};

Radio433.prototype = new AbstractOutput();

Radio433.prototype._setServo = function(pin, value) {
};
Radio433.prototype._setDigital = function(pin, value) {
};
Radio433.prototype._setPwm = function(pin, value) {
};
Radio433.prototype._setAnalog = function(pin, value) {
};

module.exports = Radio433;
