
module.exports = function(pin, input, output) {
    input.on(generic.button + ":press", function () {
        // TODO
        output.setAnalog(pin.pin, ~~(Math.random() * 255));
    });
};
