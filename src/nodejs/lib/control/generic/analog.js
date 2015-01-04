
module.exports = function(generic, controller, output) {
    controller.on(generic.button + ":press", function () {
        // TODO
        output.setAnalog(generic.pin, ~~(Math.random() * 255));
    });
};
