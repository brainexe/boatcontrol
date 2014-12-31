
var config = require("../config");

var Debug = function() {
    this.setServo = function(pin, value) {
        console.log(pin, ":", value);
    };

    this.setPin = function(pin, value) {
        console.log(pin, ":", value);
    };
};

var Serial = function(device, baud) {
    // TODO begin serial

    this.setServo = function(pin, value) {
        console.log(pin, ":", value);
    };

    this.setPin = function(pin, value) {
        console.log(pin, ":", value);
    };
};

var Raspberry = function() {
    this.setServo = function(pin, value) {
        console.log(pin, ":", value);
    };

    this.setPin = function(pin, value) {
        console.log(pin, ":", value);
    };
};

var output;
switch (config.device) {
    case 'debug':
        output = new Debug();
        break;
    case 'raspberry':
        output = new Raspberry();
        break;
    case 'serial':
        output = new Serial(config.serial_device, config.serial_baud);
        break;
}

module.exports = output;
