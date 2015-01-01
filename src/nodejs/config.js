var config = {
  // "debug" (gibt aus welche pins er ansteuern würde), "raspberry" (direkte Ansteuerung der GPIOS) oder "serial" (benutzt serial Schnittstelle)
  "device": "serial",
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
    "sound": 13
  },

  "control": {
    "antrieb": "left",

    "light": null,
    "sound": "circle",
  
    "water": "x",
    "monitors": "right"
  },

  // nur für Arduino nötig
  "serial_device": "/dev/ttyACM0",
  "serial_baud": 57600
};

module.exports = config;
