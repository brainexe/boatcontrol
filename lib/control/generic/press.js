
module.exports = function(pin, input, output) {
    input.on(pin.button + ":press", function () {
        output.setDigital(pin.pin, true);
    });

    input.on(pin.button + ":release", function () {
        output.setDigital(pin.pin, false);
    });
};
