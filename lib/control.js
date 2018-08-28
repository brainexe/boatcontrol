
const config = require('./config'),
      input  = require('./input');

const loadPin = pin => {
    const key = './control/' + pin.type;

    try {
        // todo remove "input" argument
        require(key)(pin, input);
    } catch (e) {
        console.error('Invalid control type'.red + ': ' + e, key, pin);
    }
};

module.exports.load = loadPin;

module.exports.loadAll = () => {
    for (let device in config.devices) {
        config.devices[device].forEach(pin => {
            loadPin(pin);
        });
    }
};
