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

    const directions = ['up', 'down', 'left', 'right'];
    let eventBlacklist = [
        'psxbutton',
        'updown:motion',
        'rightleft:motion',
        'forwardbackward:motion',
        'leftanalogbump',
        'rightanalogbump',
    ];

    for (let direction of directions) {
        eventBlacklist.push(`dpad${direction}:press`);
        eventBlacklist.push(`dpad${direction}:hold`);
        eventBlacklist.push(`dpad${direction}:analog`);
        eventBlacklist.push(`dpad${direction}:release`);
    }

    if (!options.motionDetection) {
        eventBlacklist = eventBlacklist.concat([
            'upDown:motion',
            'rightLeft:motion',
            'forwardBackward:motion'
        ]);
    }

    let currentMode = '';

    // todo use a plugin to support modes
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
                if (currentMode === modes[modeButton]) {
                    currentMode = null;
                } else {
                    currentMode = modes[modeButton];
                }
                console.log("[Input]".green + ' set mode: ' + currentMode);
            }
        }

        emitter.emit.apply(emitter, arguments);

        if (currentMode) {
            arguments[0] = currentMode + ':' + type;
            emitter.emit.apply(emitter, arguments);
        }
    };
}

module.exports = (emitter, controllerType, options) => {
    initialize(emitter, controllerType, options || {});
};
