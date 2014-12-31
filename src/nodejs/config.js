var config = {
  // "debug" (gibt aus welche pins er ansteuern würde), "raspberry" (direkte Ansteuerung der GPIOS) oder "arduino" (benutzt serial Schnittstelle)
  "device": "debug",
  // hier ginge auch PS4
  "controller": "dualShock3",

  // gibt ALLE controller-Werte aus
  "debug": true,

  "pins": {
    // Antrieb
    "motor": null,
    "ruder": null,

    // Monitore
    "water": null,
    "monitors": [
      {"rotate": null, "vertical": null},
      {"rotate": null, "vertical": null},
      {"rotate": null, "vertical": null}
    ],

    // Schnickschnack
    "light": null,
    "sound": null
  },

  "control": {
    "motor": "forwardBackward",
    "ruder": "rightLeft"
    // TODO...
  },

  // nur für Arduino nötig
  "serial_device": "/dev/tty-usbserial1",
  "serial_baud": 57600
};

module.exports = config;
