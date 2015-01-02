
var util = require('../lib/util');

var on_off = {};


function setup(generic, controller, output) {
    console.log(generic)
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
            var value = !on_off[id];

            on_off[id] = value;
            output.setPin(generic.pin, value ? 1 : 0, "generic_" + generic.button + "_" + generic.pin);
        });
    } else if (generic.type == 'blink') {
        function disable() {
            output.setPin(generic.pin, 0, "generic_blink");
            setTimeout(function() {
                enablePin();
            }, generic.time_off);
        }

        function enablePin() {
            output.setPin(generic.pin, 1, "generic_blink");
            setTimeout(function() {
                disable();
            }, generic.time_on)
        }

        controller.on(generic.button + ":press", function () {
            enablePin();
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
    config.pins.generic.forEach(function (generic) {
        setup(generic, controller, output);

    });
};
