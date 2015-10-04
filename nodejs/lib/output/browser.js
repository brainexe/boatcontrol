
// todo not needed. done via redis output
var AbstractOutput = require('./abstract_output');

var Browser = function() {
};

Browser.prototype = new AbstractOutput();

Browser.prototype._setServo = function(pin, value) {
};

Browser.prototype._setDigital = function(pin, value) {
};

Browser.prototype._setAnalog = function(pin, value) {
};

Browser.prototype._setPwm = function(pin, value) {
};

module.exports = Browser;
