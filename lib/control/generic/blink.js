
var pin_state = {};

module.exports = function(pin, input, output) {
    function disable() {
        output.setDigital(pin, 0);
        pin_state[pin.pin] = setTimeout(function() {
            enablePin();
        }, pin.time_off);
    }

    function enablePin() {
        output.setDigital(pin, 1);
        pin_state[pin.pin] = setTimeout(function() {
            disable();
        }, pin.time_on)
    }

    input.on(pin.button + ":press", function () {
        if (!pin_state[pin.pin]) {
            // 1st click: enable and start timer
            enablePin();
        } else {
            // 2nd: stop timer and disable pin
            clearTimeout(pin_state[pin.pin]);
            pin_state[pin.pin] = 0;
            output.setDigital(pin, 0);
        }
    });
};
