
var config = require('./config');
var input  = require('./input');
var output = require('./output');

var loadPin = function(pin) {
    const key = './control/' + pin.type;

    try {
        var control = require(key);
        control(pin, input, output);
    } catch (e) {
        console.error('Invalid control type'.red + ' ' + e, key, pin);
    }
};

module.exports.load = loadPin;

module.exports.loadAll = function() {
    config.pins.forEach(function(pin) {
        loadPin(pin);
    });
};
