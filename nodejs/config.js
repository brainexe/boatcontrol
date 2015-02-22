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
    controller: false,
    servo_as_analog: false
  },

  "pins": {
    // Antrieb
    "motor": {pin: 37, min: 0, max: 100, reverse: true},
    "ruder": {pin: 36 , min: 0, max: 100, reverse: true},

    // Monitore
    "water": {pin: null},
    "monitors": [
      {
        "rotate": {pin: 35, min: 5, max: 90},		// Bug
        "vertical": {pin: 34, min: 5, max: 90}		// Bug
      },
      {
        "rotate": {pin: 33, min: 5, max: 90},		// Heck
        "vertical": {pin: 32, min: 5, max: 90}		// Heck
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
      {pin: 10, button: 'r2', type: 'blink', time_on: 100, time_off: 100},
      {pin: 9, button: 'x', type: 'press'}
    ]
  },

  // nur für serial/Arduino nötig
  "serial_device": ["/dev/ttyACM*", "/dev/ttyUSB*"],
  "serial_baud": 57600
};

module.exports = config;
