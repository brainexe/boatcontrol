
var timers = {};

module.exports = function(pin, input, output) {
    output.setDigital(pin, pin.default);

    input.on(pin.button + ":press", function () {
        output.setDigital(pin, true);

        if (timers[pin.pin]) {
            clearTimeout(timers[pin.pin]);
        }

        timers[pin.pin] = setTimeout(function() {
            delete timers[pin.pin];
            output.setDigital(pin, false);
        }, pin.time);
    });
};
