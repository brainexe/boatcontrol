
var emitter = require('../emitter');
var _       = require('lodash');

module.exports = function(pin, input, output) {
    var macro = pin.macro;
    if (_.isString(macro)) {
        macro = macro.split('#');
    }

    if (pin.button) {
        input.on(pin.button + ":press", function () {
            exec(macro);
        });
    } else {
        exec(macro);
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
            case 'output':
                var type  = parts[1];
                var pin   = parts[2];
                var value = parts[3];
                switch (type) {
                    case 'servo':
                    case 's':
                        output.setServo(pin, value);
                        break;
                    case 'digital':
                    case 'd':
                        output.setDigital(pin, value);
                        break;
                    default:
                        throw 'Unsupported type: ' + type;
                }
                exec(macro);
                break;
            case 'controller':
                emitter.emit(parts[1]);
                exec(macro);
                break;
            default:
                throw 'Invalid command: ' + parts;
        }
    }

};
