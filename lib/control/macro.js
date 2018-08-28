const assert  = require('assert'),
      emitter = require('../emitter'),
      output  = require('../output');

// executes a list of given tasks when the button was pressed
module.exports = function(pinConfig, input) {
    assert(pinConfig.button, "no button defined");
    assert(pinConfig.macro, "no macro defined");

    let macro = pinConfig.macro;
    if (typeof macro === 'string') {
        macro = macro.split('#');
    }

    if (pinConfig.button) {
        input.on(pinConfig.button + ":press", function () {
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
                // todo we need a pin object here
                switch (type) {
                    case 'pwm':
                    case 'p':
                    case 'servo':
                    case 's':
                        output.setPwm(pin, value);
                        break;
                    case 'digital':
                    case 'd':
                        output.setDigital(pin, value);
                        break;
                    case 'analog':
                    case 'a':
                        output.setAnalog(pin, value);
                        break;
                    default:
                        throw 'Unsupported type: ' + type;
                }
                exec(macro);
                break;
            case 'input':
                emitter.emit(parts[1], parts[2]);
                exec(macro);
                break;
            default:
                throw 'Invalid command: ' + parts;
        }
    }

};
