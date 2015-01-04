
var util = require('../util');

var pin_state = {};

function setup(generic, controller, output) {
    if (generic.type == 'press') {
        controller.on(generic.button + ":press", function () {
            output.setPin(generic.pin, 1, "generic_" + generic.button + "_" + generic.pin);
        });

        controller.on(generic.button + ":release", function () {
            output.setPin(generic.pin, 0, "generic_" + generic.button + "_" + generic.pin);
        });
    } else if (generic.type == 'onoff') {
        controller.on(generic.button + ":press", function () {
            var id = generic.button + '__' + generic.pin;
            var value = !pin_state[id];

            pin_state[id] = value;
            output.setPin(generic.pin, value ? 1 : 0, "generic_" + generic.button + "_" + generic.pin);
        });
    } else if (generic.type == 'blink') {
        function disable() {
            output.setPin(generic.pin, 0, "generic_blink");
            pin_state[generic.pin] = setTimeout(function() {
                enablePin();
            }, generic.time_off);
        }

        function enablePin() {
            output.setPin(generic.pin, 1, "generic_blink");
            pin_state[generic.pin] = setTimeout(function() {
                disable();
            }, generic.time_on)
        }

        controller.on(generic.button + ":press", function () {
            if (!pin_state[generic.pin]) {
                // 1st click: enable and start timer
                enablePin();
            } else {
                // 2nd: stop timer and disable pin
                clearTimeout(pin_state[generic.pin]);
                pin_state[generic.pin] = 0;
                output.setPin(generic.pin, 0);
            }
        });

    } else if (generic.type == 'timer') {
        controller.on(generic.button + ":press", function () {
            output.setPin(generic.pin, 1, "generic_" + generic.button + "_" + generic.pin);

            setTimeout(function() {
                output.setPin(generic.pin, 0, "generic_" + generic.button + "_" + generic.pin);
            }, generic.time);
        });

    } else {
        throw "unknown type: " + generic.type;
    }
}

module.exports = function (config, controller, output) {
    config.control.generic.forEach(function (generic) {
        setup(generic, controller, output);

    });
};
