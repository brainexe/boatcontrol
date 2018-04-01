
const config  = require('./config');
const input   = require('./input');
const outputs = require('./output');

const loadPin = function(pin) {
    const key = './control/' + pin.type;

    try {
        require(key)(pin, input, outputs[pin.device]);
    } catch (e) {
        console.error('Invalid control type'.red + ': ' + e, key, pin);
    }
};

module.exports.load = loadPin;

module.exports.loadAll = function() {
    for (let device in config.devices) {
        config.devices[device].forEach(function(pin) {
            loadPin(pin);
        });
    }
};
