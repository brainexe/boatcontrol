
module.exports = function(generic, input, output) {
    input.on(generic.button + ":press", function () {
        output.setDigital(generic.pin, true);
    });

    input.on(generic.button + ":release", function () {
        output.setDigital(generic.pin, false);
    });
};
