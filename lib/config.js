let yaml = require('js-yaml');
let fs   = require('fs');

if (!fs.existsSync('config.yml')) {
    throw "Please create config.yml";
}

let config = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));

config.pins = config.pins || [];
if (config.devices) {
    for (let deviceType in config.devices) {
        for (let control of config.devices[deviceType]) {
             control.device = deviceType;
             config.pins.push(control);
        }
    }
    delete config.devices;
}

config.pinValues = {};

module.exports = config;
