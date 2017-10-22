
module.exports = function(pin, input, output) {
    input.on(pin.button + ":press", function () {
        output.setDigital(pin, true);
    });

    input.on(pin.button + ":release", function () {
        output.setDigital(pin, false);
    });
};
