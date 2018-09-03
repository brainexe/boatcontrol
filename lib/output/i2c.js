const i2cBus = require('i2c-bus'),
    AbstractOutput = require('./abstract_output'),
    Pca9685Driver = require("pca9685").Pca9685Driver;

const defaultOptions = {
    address: 0x40,
    frequency: 50,
    debug: config.debug,
};

class I2C extends AbstractOutput {
    constructor(options) {
        super();

        options = Object.assign(
            {i2c: i2cBus.openSync(1)},
            defaultOptions,
            options
        );

        this.pwm = new Pca9685Driver(options, err => {
            if (err) {
                console.error("Error initializing PCA9685 " + err);
                return;
            }
            this.connected();
        });
    }

    _setPwm(pin, value, pinObject) {
        this.pwm.setDutyCycle(pin, value / pinObject.max);
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
