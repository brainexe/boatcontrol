
var AbstractOutput = require('./abstract_output');

var Multi = function() {
    this.outputs = [];
};


Multi.prototype = new AbstractOutput();

Multi.prototype._setServo = function(pin, value) {
    this.outputs.forEach(function(output) {
        output._setServo(pin, value);
    });
};

Multi.prototype._setDigital = function(pin, value) {
    this.outputs.forEach(function(output) {
        output._setDigital(pin, value);
    });
};

Multi.prototype._setAnalog = function(pin, value) {
    this.outputs.forEach(function(output) {
        output._setAnalog(pin, value);
    });
};

Multi.prototype._setPwm = function(pin, value) {
    this.outputs.forEach(function(output) {
        output._setPwm(pin, value);
    });
};

module.exports = Multi;
