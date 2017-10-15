
var control = require('../control');
var input   = require('../input');
var output  = require('../output');

module.exports = function() {
    control.load({
        'type': 'macro',
        'macro': 'output d 1 1#sleep 1#controller 2#output d 1 0'
    }, input, output);
};
