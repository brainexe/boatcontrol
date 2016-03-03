var config = {
  // "debug" (output all commands to stdout)
  // "raspberry" (direct control via GPIOS)
  // "serial" (send serial command e.g. to arduino)
  // "debug" (print all output to stdout)
  // "redis" (push commands to all redis slaves)
  "output": ["debug", "redis", "serial"],

  // available input devices:
  // "dualShock3" or "dualShock4"
  // "redis"
  "input": ["dualShock3", "redis"],

  "plugins": [],

  "pins": [
    // engine
    {pin: 37, type: 'motor', min: 0, max: 100, reverse: true, joystick: 'left'},
    {pin: 36, type: 'ruder', min: 0, max: 100, reverse: true, joystick: 'left'},

    // water monitors
    {pinRotate: null, pinVertical: null, type: 'monitor', min: 0, max: 100, joystick: 'right'},

    // sound
    {pin: null, type: 'generic', subType: 'onoff', button: 'circle'},

    // light
    {pin: 13, type: 'generic', subType: 'onoff', button: 'circle'},

    // water pump
    {pin: null, type: 'generic', subType: 'onoff', button: 'x'},

    // custom
    {pin: 2,  type: 'generic', subType: 'press', button: 'l2'},
    {pin: 3,  type: 'generic', subType: 'onoff', button: 'l1'},
    {pin: 4,  type: 'generic', subType: 'timer', button: 'r1', time: 2000},
    {pin: 10, type: 'generic', subType: 'blink', button: 'r2', time_on: 100, time_off: 100},

    {pin: 10, type: 'sound', subType: 'espeak', button: 'r2', text: "Test"}
  ],

  "redis": 'redis://localhost',

  "server": {
    "port": 3000
  }
};

module.exports = config;
