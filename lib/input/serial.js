
var config  = require('../config');
var arduino = require('duino');

module.exports = function(emitter) {
    this.board = new arduino.Board({
        debug:     config.debug,
        device: 'ttyUSB*|ttyACM*',
        devregex: 'ttyUSB*|ttyACM*' // other duino library
    });

    // TODO
};
