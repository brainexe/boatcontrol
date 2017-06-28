
var config = require('../config');

var loadPin = function(pin, input, output) {
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

module.exports.loadAll = function(input, output) {
    config.pins.forEach(function(pin) {
        loadPin(pin, input, output);
    });
};
