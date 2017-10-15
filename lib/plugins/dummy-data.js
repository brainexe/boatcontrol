
var control = require('../control');

module.exports = function() {
    control.load({
        'type': 'macro',
        'macro': [
            'output d 1 1',
            'sleep 1',
            'controller 2',
            'output d 1 0'
        ]
    });
};
