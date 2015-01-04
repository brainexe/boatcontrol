
module.exports = function(generic, controller, output) {
    controller.on(generic.button + ":press", function () {
        output.setDigital(generic.pin, true);

        setTimeout(function() {
            output.setDigital(generic.pin, false);
        }, generic.time);
    });

};
