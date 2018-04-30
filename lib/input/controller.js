const dualShock = require('dualshock-controller');
const config    = require('../config');

function initialize(emitter, controllerType) {
    let controller = dualShock({
        config: controllerType,
        analogStickSmoothing: false,
        motionInputs: false // no gyro needed for now
    });

    controller.on('error', error => {
        console.error(error.red);
    });

    const oldEmitter = controller.emit;

    let eventBlacklist = [
        'psxbutton',
        'updown:motion',
        'rightleft:motion',
        'forwardbackward:motion',
        'leftanalogbump',
        'rightanalogbump'
    ];

    if (!config.motionDetection) {
        eventBlacklist = eventBlacklist.concat([
            'upDown:motion',
            'rightLeft:motion',
            'forwardBackward:motion'
        ]);
    }

    controller.emit = type => {
        if (eventBlacklist.indexOf(type) !== -1) {
            return;
        }

        if (controller.isIgnoredEvent) {
            if (controller.isIgnoredEvent(type)) {
                console.log(`Ignored event: ${type}`);
                return;
            }
        }

        const argsTmp = arguments;
        const args = Object.keys(argsTmp).map(k => argsTmp[k]);
        oldEmitter.apply(controller, args);
        emitter.emit.apply(emitter, args);
    };
}

module.exports = (emitter, controllerType) => {
    initialize(emitter, controllerType);
};
