
module.exports = function(pin, input, output) {
    input.on(pin.button + ":press", () => {
        output.setDigital(pin, true);
    });

    input.on(pin.button + ":release", () => {
        output.setDigital(pin, false);
    });
};
