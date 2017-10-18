var config = {
    // "debug" (output all commands to stdout)
    // "raspberry" (direct control via GPIOS)
    // "serial" (send serial command e.g. to arduino)
    // "debug" (print all output to stdout)
    "output": ["debug", "serial", "raspberry"],

    // available input devices:
    // "dualShock3" or "dualShock4"
    // "serial"
    "input": ["dualShock3"],

    "plugins": [
        "dummy-data"
        // "controller-debug"
    ],

    "debug": true,
    "motionDetection": false,

    "pins": [
        // engine
        {
            type: 'motor',
            joystick: 'right',
            device: 'serial',
            pin: 6,
            min: 0,
            max: 180,
            defaultPosition: 0, // todo
            reverse: true
        },
        {
            type: 'ruder',
            joystick: 'right',
            device: 'serial',
            pin: 9,
            min: 0,
            max: 180,
            defaultPosition: 0,
            reverse: true
        },

        // water monitors
        {
            pin: 5,
            device: 'serial',
            type: 'monitor',
            min: 0,
            max: 100,
            joystick: 'left'
        },

        // light
        {
            pin: 13,
            device: 'serial',
            type: 'generic',
            subType: 'onoff',
            button: 'circle'
        },

        // auto-on light
        {
            pin: 13,
            type: 'generic',
            device: 'serial',
            subType: 'autoon',
            button: 'circle'
        },

        // water pump
        {
            pin: 14,
            type: 'generic',
            device: 'serial',
            subType: 'onoff',
            button: 'x'
        },

        // custom
        {pin: 2, type: 'generic', subType: 'press', button: 'l2'},
        {pin: 3, type: 'generic', subType: 'onoff', button: 'l1'},
        {pin: 4, type: 'generic', subType: 'timer', button: 'r1', time: 2000},
        {pin: 10, type: 'generic', subType: 'blink', button: 'r2', time_on: 1000, time_off: 500},

        // increasing value when holding
        {
            pin: 15,
            type: 'generic',
            device: 'serial',
            subType: 'increase',
            button: 'square'
        },

        // sound
        {type: 'sound', subType: 'espeak', button: 'r2', text: "Test"},
        {type: 'sound', subType: 'file', button: 'r1', file: "horn.mp3"},

        // test macro
        {
            type: 'macro',
            macro: [
                'output d 1 1',
                'sleep 1',
                'controller 2',
                'output d 1 0'
            ],
            button: 'r1'
        },

        // restart
        {
            type: 'restart',
            button: 'psxButton'
        }
    ],

    "server": {
        "host": "0.0.0.0",
        "port": 3000
    }
};

module.exports = config;