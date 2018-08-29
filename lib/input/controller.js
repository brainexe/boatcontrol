const dualShock = require('dualshock-controller');

function initialize(emitter, controllerType, options) {
    let controller = dualShock({
        config: controllerType,
        analogStickSmoothing: false,
        motionInputs: false // no gyro needed for now
    });

    controller.on('error', error => {
        console.error(error.red);
    });

    let oldEmitter = controller.emit;

    let eventBlacklist = [
        'psxbutton',
        'updown:motion',
        'rightleft:motion',
        'forwardbackward:motion',
        'leftanalogbump',
        'rightanalogbump'
    ];

    if (!options.motionDetection) {
        eventBlacklist = eventBlacklist.concat([
            'upDown:motion',
            'rightLeft:motion',
            'forwardBackward:motion'
        ]);
    }

    controller.emit = function(type) {
        if (eventBlacklist.indexOf(type) !== -1) {
            return;
        }

        if (controller.isIgnoredEvent) {
            if (controller.isIgnoredEvent(type)) {
                console.log(`Ignored event: ${type}`);
                return;
            }
        }

        let argsTmp = arguments;
        let args = Object.keys(argsTmp).map(function (k) {
            return argsTmp[k]
        });
        oldEmitter.apply(controller, args);
        emitter.emit.apply(emitter, args);
    };
}

module.exports = (emitter, controllerType, options) => {
    initialize(emitter, controllerType, options);
};
