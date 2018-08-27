const i2cBus = require('i2c-bus'),
    AbstractOutput = require('./abstract_output'),
    Pca9685Driver = require("pca9685").Pca9685Driver;

class I2C extends AbstractOutput {
    constructor() {
        super();

        // todo pass custom options
        const options = {
            i2c: i2cBus.openSync(1),
            address: 0x40,
            frequency: 50,
            debug: false
        };

        this.pwm = new Pca9685Driver(options, function (err) {
            if (err) {
                console.error("Error initializing PCA9685 " + err);
                return;
            }
            this.connected();
        });
    }

    _setPwm(pin, value) {
        // todo we have to pass 0-1 as value
        this.pwm.setDutyCycle(pin, value / pin.max);
    };

    _setDigital(pin, value) {
        if (value) {
            this.pwm.channelOn(pin);
        } else {
            this.pwm.channelOff(pin);
        }
    };
}

module.exports = I2C;
