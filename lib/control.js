
const config = require('./config');

const loadPin = pinConfig => {
    const key = './control/' + pinConfig.type;

    try {
        require(key)(pinConfig);
    } catch (e) {
        console.error('Invalid control type'.red + ': ' + e, key, pinConfig);
    }
};

module.exports.load = loadPin;

module.exports.loadAll = () => {
    for (let device in config.devices) {
        if (!config.devices[device].actions) {
            continue;
        }
        config.devices[device].actions.forEach(pinConfig => {
            loadPin(pinConfig);
        });
    }
};
