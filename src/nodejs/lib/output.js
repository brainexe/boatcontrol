
var config = require("../config");

var output;
switch (config.device) {
    case 'debug':
        output = require('./output/debug');
        output = new output();
        break;
    case 'raspberry':
        output = require('./output/raspberry');
        output = new output();
        break;
    case 'serial':
        output = require('./output/serial');
        output = new output(config.serial_device, config.serial_baud);
        break;
    case 'radio_433':
        output = require('./output/radio_433');
        output = new output();
        break;
    default:
        throw "Invalid output type: " + config.device;
}

module.exports = output;
