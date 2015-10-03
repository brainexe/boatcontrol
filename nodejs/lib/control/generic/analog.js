
module.exports = function(generic, input, output) {
    input.on(generic.button + ":press", function () {
        // TODO
        output.setAnalog(generic.pin, ~~(Math.random() * 255));
    });
};
