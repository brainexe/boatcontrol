var config = {
  // "debug" (output all commands to stdout)
  // "raspberry" (direct control via GPIOS)
  // "serial" (send serial command e.g. to arduino)
  // "debug" (print all output to stdout)
  // "redis" (push commands to all redis slaves)
  "output": ["debug", "redis", "serial"],

  // available input devices:
  // "dualShock3" or "dualShock4"
  // "serial"
  "input": ["dualShock3"],

  "plugins": [
      // "controller-debug"
  ],

  "debug": true,
  "motionDetection": false,

  "pins": [
    // engine
    {
      type: 'motor',
      joystick: 'right',
      pin: 35,
      min: 0,
      max: 100,
      defaultPosition: 0,
      reverse: true
    },
    {
      type: 'ruder',
      joystick: 'right',
      pin: 37,
      min: 0,
      max: 100,
      defaultPosition: 0,
      reverse: true
    },

    // water monitors
    //{pin: null, type: 'monitor', min: 0, max: 100, joystick: 'left'
    // {pin: 14, type: 'generic', subType: 'onoff', button: 'l2'},

    // light
    {pin: 13, type: 'generic', subType: 'onoff', button: 'circle'},

    // auto-on light
    {pin: 13, type: 'generic', subType: 'autoon', button: 'circle'},

    // water pump
    {pin: 14, type: 'generic', subType: 'onoff', button: 'x'},

    // custom
    {pin: 2,  type: 'generic', subType: 'press', button: 'l2'},
    {pin: 3,  type: 'generic', subType: 'onoff', button: 'l1'},
    {pin: 4,  type: 'generic', subType: 'timer', button: 'r1', time: 2000},
    {pin: 10, type: 'generic', subType: 'blink', button: 'r2', time_on: 1000, time_off: 500},

    // sound
    {type: 'sound', subType: 'espeak', button: 'r2', text: "Test"},
    {type: 'sound', subType: 'file', button: 'r1', file: "horn.mp3"},

    // restart
    {type: 'restart', button: 'psxButton'}
  ],

  "soundExecutable": "mplayer",
  "redis": 'redis://localhost',

  "server": {
    "host": "0.0.0.0",
    "port": 3000
  }
};

module.exports = config;
