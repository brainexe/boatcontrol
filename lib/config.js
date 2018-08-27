let yaml = require('js-yaml');
let fs   = require('fs');

if (!fs.existsSync('config.yml')) {
    throw "Please create config.yml";
}

let config = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));

// add "device" to pins
if (config.devices) {
    // todo add "control" subtype and other options
    for (let deviceType in config.devices) {
        for (let control of config.devices[deviceType]) {
             // todo remove device from here
             control.device = deviceType;
        }
    }
}

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
