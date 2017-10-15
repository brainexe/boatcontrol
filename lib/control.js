
var config = require('./config');
var input  = require('./input');
var output = require('./output');

var loadPin = function(pin) {
    var key;
    if (pin.subType) {
        key = './control/' + pin.type + '/' + pin.subType;
    } else {
        key = './control/' + pin.type;
    }

    try {
        var control = require(key);
    } catch (e) {
        console.error('invalid control type'.red + ' ' + e, key, pin);
        return;
    }

    control(pin, input, output);
};

module.exports.load = loadPin;

module.exports.loadAll = function() {
    config.pins.forEach(function(pin) {
        loadPin(pin);
    });
};
