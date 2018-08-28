
let control = require('../control');

// todo: it's too ungeneric
module.exports = function() {
    control.load({
        'type': 'macro',
        'macro': [
            'output d 1 1',
            'sleep 1',
            'input circle:press',
            'output d 1 0'
        ]
    });
};
