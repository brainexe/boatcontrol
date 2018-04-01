
// enable pin, when button is pressed
module.exports = function(pinConfig, input, output) {
    output.setDigital(pinConfig, false);

    input.on(pinConfig.button + ":press", () => {
        output.setDigital(pinConfig, true);
    });

    input.on(pinConfig.button + ":release", () => {
        output.setDigital(pinConfig, false);
    });
};
