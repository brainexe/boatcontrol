
module.exports = function(config, controller, output) {
    controller.on("x:hold", function() {
        output.setPin(config.pins.water, 1);
    });

};
