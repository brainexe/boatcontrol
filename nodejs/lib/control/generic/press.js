
var pin_state = {};

module.exports = function(generic, controller, output) {
    controller.on(generic.button + ":press", function () {
        output.setDigital(generic.pin, true);
    });

    controller.on(generic.button + ":release", function () {
        output.setDigital(generic.pin, false);
    });
};
