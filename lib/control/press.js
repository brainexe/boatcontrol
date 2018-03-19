
module.exports = function(pin, input, output) {
    output.setDigital(pin, false);

    input.on(pin.button + ":press", () => {
        output.setDigital(pin, true);
    });

    input.on(pin.button + ":release", () => {
        output.setDigital(pin, false);
    });
};
