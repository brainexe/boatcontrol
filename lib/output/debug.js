
var AbstractOutput = require('./abstract_output');

var Debug = function() {
};

Debug.prototype = new AbstractOutput();

Debug.prototype._setDigital = function(pin, value) {
    var text = value ? "ON".green : "OFF".red;
    if (pin.device) {
        text += "(" + pin.device + ")";
    }

    console.log('[Output]'.green + ' digital'.blue, pin, text);
};

Debug.prototype._setServo = function(pin, value) {
    var text = value + ' (' + pin.pin + ' - ' + pin.max + ')';

    if (pin.device) {
        text += "(" + pin.device + ")";
    }

    // todo more pin data

    console.log('[Output]'.green + ' servo'.blue, pin, value);
};

Debug.prototype._setAnalog = function(pin, value) {
    console.log('[Output]'.green + ' analog'.blue, pin, value);
};

module.exports = Debug;
