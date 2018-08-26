
const emitter = require('../emitter');

class AbstractOutput {
    constructor() {
    }

    setPwm(pinObject, value) {
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
    }

    setDigital(pinObject, value) {
        let pinId = pinObject.pin;
        value = !!value;

        this._setDigital(pinId, ~~value);

        pinObject.value = !!value;
        pinObject.outputType = 'digital';
        emitter.emit('pinChange', pinObject);

        let text = value ? "ON".green : "OFF".red;
        console.log('[Output]'.green + ' digital'.blue, pinId, pinObject.device, text);
    }

    setAnalog(pinObject, value) {
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
    }

    _setPwm(pin, value) {
        throw "_setPwm is not implemented";
    };

    _setDigital(pin, value) {
        throw "_setPwm is not implemented";
    };

    _setAnalog(pin, value) {
        throw "_setPwm is not implemented";
    };
}


module.exports = AbstractOutput;
