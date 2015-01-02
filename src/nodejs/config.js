var config = {
  // "debug" (gibt aus welche pins er ansteuern würde), "raspberry" (direkte Ansteuerung der GPIOS) oder "serial" (benutzt serial Schnittstelle)
  "device": "serial",
  // hier ginge auch PS4
  "controller": "dualShock3",

  // gibt ALLE controller-Werte aus
  "debug": {
    output: true,
    controller: false
  },

  "pins": {
    // Antrieb
    "motor": 37,
    "ruder": null,

    // Monitore
    "water": null,
    "monitors": [
      {"rotate": 36, "vertical": null},
      {"rotate": null, "vertical": null},
      {"rotate": null, "vertical": null}
    ],

    // Schnickschnack
    "light": null,
    "sound": 13,

    "generic": [
        // todo on/off
        // todo impuls
      {pin: 13, button: 'l2', type: 'press'},
      {pin: 13, button: 'l1', type: 'onoff'},
      {pin: 13, button: 'r1', type: 'timer', time: 2000},
      {pin: 13, button: 'r2', type: 'blink', time_on: 100, time_off: 100},
    ]

  },

  "control": {
    "antrieb": "left",

    "light": null,
    "sound": "circle",

    "water": "x",
    "monitors": "right"
  },

  // todo add servo min/max, reverse, kalibierung

  // nur für Arduino nötig
  "serial_device": "/dev/ttyACM*",
  "serial_baud": 57600
};

module.exports = config;
