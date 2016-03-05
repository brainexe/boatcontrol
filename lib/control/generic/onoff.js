
var pin_state = {};

module.exports = function(pin, input, output) {
    input.on(pin.button + ":press", function () {
        var id = pin.button + '__' + pin.pin;
        var value = !pin_state[id];

        pin_state[id] = value;
        output.setDigital(pin, value ? 1 : 0);
    });
};
