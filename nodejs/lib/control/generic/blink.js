
var pin_state = {};

module.exports = function(generic, controller, output) {
    function disable() {
        output.setDigital(generic.pin, 0);
        pin_state[generic.pin] = setTimeout(function() {
            enablePin();
        }, generic.time_off);
    }

    function enablePin() {
        output.setDigital(generic.pin, 1);
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
            output.setDigital(generic.pin, 0);
        }
    });

};
