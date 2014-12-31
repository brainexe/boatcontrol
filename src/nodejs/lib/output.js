
var config = require("../config");

var output;
switch (config.device) {
    case 'debug':
        output = require('./debug');
        output = new output();
        break;
    case 'raspberry':
        output = require('./raspberry');
        output = new output();
        break;
    case 'serial':
        output = require('./serial');
        output = new output(config.serial_device, config.serial_baud);
        break;
}

module.exports = output;
