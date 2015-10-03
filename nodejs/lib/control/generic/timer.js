
var timers = {};

module.exports = function(pin, input, output) {
    input.on(pin.button + ":press", function () {
        output.setDigital(pin.pin, true);

        if (timers[pin.pin]) {
            clearTimeout(timers[pin.pin]);
        }
        timers[pin.pin] = setTimeout(function() {
            delete timers[pin.pin];
            output.setDigital(pin.pin, false);
        }, pin.time);
    });
};
