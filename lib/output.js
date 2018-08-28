
const config = require("./config");

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
            throw "[output] Invalid output type: ".error + type;
    }
    return output;
}

let output = {};
for (let name in config.output) {
    let options = config.output[name];
    output[name] = getOutput(options.type, options);
}

class Control {
    /**
     * @param pin
     */
    getOutput(pin) {
       if (typeof output[pin.device] == "undefined") {
           throw `Type ${pin.device} not found`
       }
        return output[pin.device];
    }

    setDigital(pin, value) {
        return this.getOutput(pin).setDigital(pin, value);
    }

    setPwm(pin, value) {
        return this.getOutput(pin).setPwm(pin, value);

    }

    setAnalog(pin, value) {
        return this.getOutput(pin).setAnalog(pin, value);
    };
}

module.exports = new Control();
