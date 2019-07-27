var i2cBus = require("i2c-bus");
require("../lib/util");
var Pca9685Driver = require("pca9685").Pca9685Driver;
var options = {
    i2c: i2cBus.openSync(1),
    address: 0x40,
    frequency: 50,
    debug: true
};

pwm = new Pca9685Driver(options, function(err) {
    let promise = Promise.resolve();
    if (err) {
        console.error("Error initializing PCA9685");
        process.exit(-1);
    }
    console.log("Initialization done");

    // Set the pulse length to 1500 microseconds for channel 2
    pwm.setPulseLength(1, 0);

    promise.delay(500);
    promise.then(() => {
        console.log("set max");
        pwm.setPulseLength(1, 2000);
    });
    promise.delay(2500);
    promise.then(() => {
        console.log("set min");
        pwm.setPulseLength(1, 1000);
    });

    promise.delay(1000);
    promise.then(() => {
        console.log("set default");
        pwm.setPulseLength(1, 1500);
    });
});

