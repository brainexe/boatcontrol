let yaml = require('js-yaml');
let fs   = require('fs');

if (!fs.existsSync('config.yml')) {
    throw "Please create config.yml";
}

let config = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));

// todo merge devices/outputs
// add "device" to pins
if (config.devices) {
    for (let deviceType in config.devices) {
        for (let control of config.devices[deviceType].actions) {
             control.device = deviceType;
        }
    }
}

module.exports = config;
