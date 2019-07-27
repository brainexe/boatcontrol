
const emitter = require('../emitter');
const util = require('../util');

// todo use const
const ANALOG_MAX = 255;

class AbstractOutput {
    constructor() {
        this.isConnected = false;
        this.queue = [];
    }

    connected() {
        this.isConnected = true;

        if (this.queue.length > 0) {
            console.log('[Output]'.green +  ' Execute ' + this.queue.length + ' queued events');
            let func;
            while (func = this.queue.pop()) {
                func()
            }
            console.log('[Output]'.green +  ' Queue is empty now!');
        }
    }

    setPwm(pinObject, value) {
        let pinId = pinObject.pin;
        value = util.round(value, 1);

        if (value && pinObject.value === value) {
            // no change
            return;
        }

        if (!this.isConnected) {
            this.queue.push(this._setPwm.bind(this, pinId, value, pinObject));
            console.log('[Output]'.yellow + ' Queue pwm value', pinId, value);
            return;
        }

        this._setPwm(pinId, value, pinObject);

        pinObject.value = value;
        pinObject.outputType = 'pwm';
        emitter.emit('pinChange', pinObject);

        console.log('[Output]'.green + ' pwm'.blue, pinId, pinObject.device, value);
    }

    setDigital(pinObject, value) {
        let pinId = pinObject.pin;
        value = !!value;

        if (!this.isConnected) {
            this.queue.push(this._setDigital.bind(this, pinId, ~~value, pinObject));
            console.log('[Output]'.yellow + ' Queue digital value', pinId, value);
            return;
        }

        this._setDigital(pinId, ~~value, pinObject);

        pinObject.value = !!value;
        pinObject.outputType = 'digital';
        emitter.emit('pinChange', pinObject);

        let text = value ? "ON".green : "OFF".red;
        console.log('[Output]'.green + ' digital'.blue, pinId, pinObject.device, text);
    }

    // value between 0 and 255
    setAnalog(pinObject, value) {
        let pinId = pinObject.pin;
        value = util.round(value, 1);
        if (!pinId) {
            return;
        }

        if (!this.isConnected) {
            this.queue.push(this._setAnalog().bind(this, pinId, value, pinObject));
            console.log('[Output]'.yellow + ' Queue analog value', pinId, value);
            return;
        }

        this._setAnalog(pinId, value, pinObject);

        pinObject.value = value;
        pinObject.outputType = 'analog';
        emitter.emit('pinChange', pinObject);

        console.log('[Output]'.green + ' analog'.blue, pinId, pinObject.device, value);
    }

    _setPwm(pinId, value, pinObject) {
        throw "_setPwm is not implemented";
    };

    _setDigital(pinId, value, pinObject) {
        throw "_setPwm is not implemented";
    };

    _setAnalog(pinId, value, pinObject) {
        throw "_setPwm is not implemented";
    };
}


module.exports = AbstractOutput;
