
var
    config  = require("../config"),
    util    = require('util');

function getOutput(type) {
    var output;
    switch (type) {
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
        case 'browser':
            output = require('./output/browser');
            output = new output();
            break;
        case 'redis':
            output = require('./output/redis');
            output = new output();
            break;
        case 'metawear':
            output = require('./output/metawear');
            output = new output();
            break;
        default:
            throw "Invalid output type: " + type;
    }
    return output;
}

var output;
if (util.isArray(config.device)) {
    output = require('./output/multiple');
    output = new output();
    config.device.forEach(function(type) {
        output.addOutput(getOutput(type));
    });
} else {
    output = getOutput(config.device);
}

module.exports = output;
