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
        for (let control of config.devices[deviceType]) {
             control.device = deviceType;
        }
    }
}

// todo use same structure as input/output for plugins
// format options of plugins
let plugins = {};
config.plugins.forEach(plugin => {
    let options = {};
    if (typeof plugin === 'object') {
        options = plugin;
        plugin = Object.keys(plugin)[0];
    }
    plugins[plugin] = options;
});
config.plugins = plugins;

module.exports = config;
