var AbstractOutput = require('./abstract_output');

var Debug = function() {
};

Debug.prototype = new AbstractOutput();

Debug._setValue = function(pin, value) {
};

module.exports = Debug;
