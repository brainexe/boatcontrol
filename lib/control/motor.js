const assert = require('assert'),
      util = require('../util'),
      controller = require('../controller'),
      sound = require('../sound'),
      output = require('../output'),
      input = require('../input');

module.exports = pinConfig => {
    assert(pinConfig.min >= 0, "no min value defined");
    assert(pinConfig.max > 0, "no max value defined");
    assert(pinConfig.min < pinConfig.max, "max must be bigger then min");

    pinConfig.defaultValue = pinConfig.defaultValue || (pinConfig.max + pinConfig.min) / 2;

    output.setPwm(pinConfig, pinConfig.defaultValue);

    input.on(pinConfig.joystick + ':move', data => {
        if (pinConfig.buffer > 0) {
            if (data.y > pinConfig.defaultValue + pinConfig.buffer) {
                data.y -= pinConfig.buffer;
            } else if (data.y < pinConfig.defaultValue - pinConfig.buffer) {
                data.y += pinConfig.buffer;
            }
        }

        let power = util.map(
            data.y,
            controller.JOYSTICK_MIN,
            controller.JOYSTICK_MAX,
            pinConfig.min,
            pinConfig.max
        );

        output.setPwm(pinConfig, power);
    });

    // stop motor when connection lost
    input.on('connection:change', data => {
        console.log("controller status changed", data);
        //output.setPwm(pinConfig, pinConfig.defaultValue);
        sound.playFile('bing.mp3');
    })

};
