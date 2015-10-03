var dualShock = require('dualshock-controller'),
    config = require('../config');

module.exports = function(emitter, controllerType) {
    var controller = dualShock({
        config: controllerType,
        analogStickSmoothing: false,
        motionInputs: true
    });

    var oldEmitter = controller.emit;

    controller.emit = function() {
        var argsTmp = arguments;
        var args = Object.keys(argsTmp).map(function(k){return argsTmp[k]});
        oldEmitter.apply(controller, args);
        emitter.emit.apply(emitter, args);
    };
};