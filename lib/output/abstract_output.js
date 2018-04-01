
const emitter = require('../emitter');
const AbstractOutput = function() {
};

AbstractOutput.prototype.setPwm = function(pinObject, value) {
    let pinId = pinObject.pin;
    value = ~~value;

    if (value in pinObject && pinObject.value === value) {
        return;
    }

    this._setPwm(pinId, value);

    pinObject.value = value;
    pinObject.outputType = 'servo';
    emitter.emit('pinChange', pinObject);

    console.log('[Output]'.green + ' servo'.blue, pinId, pinObject.device, value);
};

AbstractOutput.prototype.setDigital = function(pinObject, value) {
    let pinId = pinObject.pin;
    value = !!value;

    this._setDigital(pinId, ~~value);

    pinObject.value = !!value;
    pinObject.outputType = 'digital';
    emitter.emit('pinChange', pinObject);

    let text = value ? "ON".green : "OFF".red;
    console.log('[Output]'.green + ' digital'.blue, pinId, pinObject.device, text);
};

AbstractOutput.prototype.setAnalog = function(pinObject, value) {
    let pinId = pinObject.pin;
    value = ~~value;
    if (!pinId) {
        return;
    }

    this._setAnalog(pinId, value);

    pinObject.value = value;
    pinObject.outputType = 'analog';
    emitter.emit('pinChange', pinObject);

    console.log('[Output]'.green + ' analog'.blue, pinId, pinObject.device, value);
};

AbstractOutput.prototype._setPwm = function(pin, value) {
    throw "_setPwm is not implemented";
};

AbstractOutput.prototype._setDigital = function(pin, value) {
    throw "_setDigital is not implemented";
};

AbstractOutput.prototype._setAnalog = function(pin, value) {
    throw "_setAnalog is not implemented";
};

module.exports = AbstractOutput;
