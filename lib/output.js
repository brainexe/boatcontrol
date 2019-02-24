
const config = require('./config'),
      abstractOutput = require('./output/abstract_output');

function getOutput(type, options) {
    let output;
    switch (type) {
        case 'raspberry':
            output = new (require('./output/raspberry'))(options);
            break;
        case 'serial':
            output = new (require('./output/serial'))(options);
            break;
        case 'firmata':
            output = new (require('./output/firmata'))(options);
            break;
        case 'i2c':
            output = new (require('./output/i2c'))(options);
            break;
        default:
            console.error("[output] Invalid output type: ".error + type);
            output = new (require('./output/abstract_output'))(options);

    }
    return output;
}

let output = {};
for (let name in config.devices) {
    let options = config.devices[name];
    output[name] = getOutput(options.type, options);
}

class Control {
    /**
     * @param pin
     * @returns {abstractOutput}
     */
    getOutput(pin) {
       if (typeof output[pin.device] == "undefined") {
           throw `Output type ${pin.device} not found`
       }
        return output[pin.device];
    }

    setDigital(pin, value) {
        return this.getOutput(pin).setDigital(pin, value);
    }

    setPwm(pin, value) {
        return this.getOutput(pin).setPwm(pin, value);
    }

    // value between 0 and 255
    setAnalog(pin, value) {
        return this.getOutput(pin).setAnalog(pin, value);
    };
}

module.exports = new Control();
