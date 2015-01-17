
var timers = {};

module.exports = function(generic, controller, output) {
    controller.on(generic.button + ":press", function () {
        output.setDigital(generic.pin, true);

        if (timers[generic.pin]) {
            clearTimeout(timers[generic.pin]);
        }
        timers[generic.pin] = setTimeout(function() {
            delete timers[generic.pin];
            output.setDigital(generic.pin, false);
        }, generic.time);
    });

};
