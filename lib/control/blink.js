
let pinState = {};
// todo add amount to define max blinks
module.exports = function(pin, input, output) {
    output.setDigital(pin, pin.default);

    function disable() {
        output.setDigital(pin, 0);
        pinState[pin.pin] = setTimeout(function() {
            enablePin();
        }, pin.time_off);
    }

    function enablePin() {
        output.setDigital(pin, 1);
        pinState[pin.pin] = setTimeout(function() {
            disable();
        }, pin.time_on)
    }

    input.on(pin.button + ":press", function () {
        if (!pinState[pin.pin]) {
            // 1st click: enable and start timer
            enablePin();
        } else {
            // 2nd: stop timer and disable pin
            clearTimeout(pinState[pin.pin]);
            pinState[pin.pin] = 0;
            output.setDigital(pin, 0);
        }
    });
};
