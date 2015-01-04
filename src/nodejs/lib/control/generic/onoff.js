
var pin_state = {};

module.exports = function(generic, controller, output) {
    controller.on(generic.button + ":press", function () {
        var id = generic.button + '__' + generic.pin;
        var value = !pin_state[id];

        pin_state[id] = value;
        output.setDigital(generic.pin, value ? 1 : 0);
    });
};
