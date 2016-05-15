
var
    config = require("./config"),
    util   = require('util');

function getOutput(type) {
    var output;
    switch (type) {
        case 'debug':
            output = require('./output/debug');
            output = new output();
            break;
        case 'raspberry':
            output = require('./output/raspberry');
            output = new output();
            break;
        case 'serial':
            output = require('./output/serial');
            output = new output();
            break;
        case 'redis':
            output = require('./output/redis');
            output = new output();
            break;
        default:
            throw "Invalid output type: ".error + type;
    }
    output.setType(type);
    return output;
}

var output = require('./output/multiple');
output = new output();
config.output.forEach(function(type) {
    output.addOutput(getOutput(type));
});

module.exports = output;
