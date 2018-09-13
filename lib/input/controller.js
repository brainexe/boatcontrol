const dualShock = require('dualshock-controller');

function initialize(emitter, controllerType, options) {
    let modes = options.modes || {};

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

    let currentMode = '';

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

        for (let modeButton in modes) {
            if (type.indexOf(modeButton) === 0) {
                if (currentMode == modeButton) {
                    currentMode = null;
                } else {
                    currentMode = modes[modeButton];
                }
                console.log("[Input]".green + ' set mode: ' + currentMode);
            }
        }

        // todo sense?
        let argsTmp = arguments;
        let args = Object.keys(argsTmp).map(k => argsTmp[k]);

        // todo why old emitter?
        oldEmitter.apply(controller, args);
        emitter.emit.apply(emitter, args);

        if (currentMode) {
            args[0] = currentMode + ':' + type;

            oldEmitter.apply(controller, args);
            emitter.emit.apply(emitter, args);
        }
    };
}

module.exports = (emitter, controllerType, options) => {
    initialize(emitter, controllerType, options);
};
