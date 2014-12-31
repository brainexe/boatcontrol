module.exports = function(config, controller, output) {

    controller.on('left:move', function (data) {
        output.setServo(config.pins.ruder, data);
    });

    //controller.on('right:move', function (data) {
    //    output.setServo(config.pins.ruder, -data);
    //});

};
