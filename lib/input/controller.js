
var dualShock = require('dualshock-controller');
var metric    = require('../metric');
var config    = require('../config');

module.exports = function(emitter, controllerType) {
    var controller = dualShock({
        config: controllerType,
        analogStickSmoothing: false,
        motionInputs: false // no gyro needed for now
    });

    controller.on('error', function(error) {
        console.error(error.red);
    });

    controller.setExtras({
        rumbleLeft:  1,   // 0-1 (Rumble left on/off)
        led: 18 // 2 | 4 | 8 | 16 (Leds 1-4 on/off, bitmasked)
    });
    setTimeout(function () {
        controller.setExtras({
            rumbleLeft:  0,   // 0-1 (Rumble left on/off)
            led: 18 // 2 | 4 | 8 | 16 (Leds 1-4 on/off, bitmasked)
        });
    }, 2000);

    var oldEmitter = controller.emit;

    var eventBlacklist = [
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
    var eventsPerMinute = metric.meter({
        name      : 'events/min',
        samples   : 1,
        timeframe : 60
    });

    controller.emit = function(type) {
        if (eventBlacklist.indexOf(type) !== -1) {
            return;
        }

        eventsPerMinute.mark();

        var argsTmp = arguments;
        var args = Object.keys(argsTmp).map(function(k){return argsTmp[k]});
        oldEmitter.apply(controller, args);
        emitter.emit.apply(emitter, args);
    };
};
