
var util = require('../util');
var _    = require('lodash');

module.exports = function(pin, input, output) {
    var macro = pin.macro;
    if (_.isString(macro)) {
        macro = macro.split('#');
    }

    function exec(macro) {
        var fullCommand = macro.shift();
        if (!fullCommand) {
            return;
        }
        var parts = fullCommand.split(' ');
        switch (parts[0].toLowerCase()) {
            case 'sleep':
                setTimeout(function () {
                    exec(macro)
                }, parts[1] * 1000);
                break;
            case 'controller':
                // todo

                exec(macro);
                break;
            case 'output':
                // todo
                // emmiter.emit(message);

                exec(macro);
                break;
            default:
                throw 'Invalid command: ' + parts;
        }
    }

    exec(macro);
};
