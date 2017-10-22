
var yaml = require('js-yaml');
var fs   = require('fs');


if (!fs.existsSync('config.yml')) {
    throw "Please create config.yml";
}

var config = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));

config.pins = config.pins || [];
if (config.devices) {
    for (var deviceType in config.devices) {
        for (var control of config.devices[deviceType]) {
             control.device = deviceType;
             config.pins.push(control);
        }
    }
    delete config.devices;
}

config.pinValues = {};

module.exports = config;
