const gamepad = require('gamepad');

function initialize(emitter, options) {
    gamepad.init();

    const controllerType =  'dualshock3';
    const rawConfig = require('dualshock-controller/controllerConfigurations/' + controllerType + ".json");

    for (var i = 0, l = gamepad.numDevices(); i < l; i++) {
        console.log(i, gamepad.deviceAtIndex());
    }

    setInterval(gamepad.processEvents, 16);
    setInterval(gamepad.detectDevices, 500);

    gamepad.on("move", function (id, axis, value) {
        console.log("move", {
            id: id,
            axis: axis,
            value: value,
        });
    });

    gamepad.on("up", function (id, num) {
        console.log("up", {
            id: id,
            num: num,
        });
    });

    gamepad.on("down", function (id, num) {
        console.log("down", {
            id: id,
            num: num,
        });
    });
}

module.exports = (emitter, controllerType, options) => {
    initialize(emitter, controllerType, options);
};
