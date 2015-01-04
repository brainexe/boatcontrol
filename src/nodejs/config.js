var config = {
  // "debug" (gibt aus welche pins er ansteuern würde)
  // "raspberry" (direkte Ansteuerung der GPIOS)
  // "serial" (benutzt serial Schnittstelle)
  // "443" (benutzt 443 frequenz)
  "device": "serial",

  // hier ginge auch PS4
  "controller": "dualShock3",

  // gibt ALLE controller-Werte aus
  "debug": {
    output: true,
    controller: true,
    servo_as_analog: true
  },

  "pins": {
    // Antrieb
    "motor": {pin: 6, min: 5, max: 90, reverse: true},
    "ruder": {pin: null , min: 5, max: 90, reverse: true},

    // Monitore
    "water": {pin: null, min: 5, max: 90},
    "monitors": [
      {
        "rotate": {pin: 36, min: 5, max: 90},
        "vertical": {pin: null, min: 5, max: 90}
      },
      {
        "rotate": {pin: null, min: 5, max: 90},
        "vertical": {pin: null, min: 5, max: 90}
      }
    ],

    // Schnickschnack
    "light": {pin: null},
    "sound": {pin: 13}
  },

  "control": {
    "antrieb": "left",

    "light": null,
    "sound": "circle",

    "water": "x",
    "monitors": "right",

    "generic": [
      {pin: 2, button: 'l2', type: 'press'},
      {pin: 3, button: 'l1', type: 'onoff'},
      {pin: 4, button: 'r1', type: 'timer', time: 2000},
      {pin: 5, button: 'r2', type: 'blink', time_on: 100, time_off: 100},
      {pin: 5, button: 'x', type: 'analog', time_on: 100},
    ]
  },

  // nur für serial/Arduino nötig
  "serial_device": "/dev/ttyACM*",
  "serial_baud": 57600
};

module.exports = config;
