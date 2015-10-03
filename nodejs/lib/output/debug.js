
var AbstractOutput = require('./abstract_output');

var Debug = function() {
};

Debug.prototype = new AbstractOutput();

Debug.prototype._setDigital = function(pin, value) {
    console.log('set digital'.blue, pin, value);
};

Debug.prototype._setServo = function(pin, value) {
    console.log('set servo'.blue, pin, value);
};

Debug.prototype._setAnalog = function(pin, value) {
    console.log('set analog'.blue, pin, value);
};

Debug.prototype._setPwm = function(pin, value) {
    console.log('set pwm'.blue, pin, value);
};

module.exports = Debug;
