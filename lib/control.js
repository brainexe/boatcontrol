
const config = require('./config');
const input  = require('./input');
const output = require('./output');

const loadPin = function(pin) {
    const key = './control/' + pin.type;

    try {
        // todo remove "output" argument
        require(key)(pin, input, output);
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
