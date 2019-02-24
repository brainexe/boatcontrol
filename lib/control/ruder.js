
const util       = require('../util'),
      output     = require('../output'),
      controller = require('../controller'),
      input      = require('../input'),
      assert     = require('assert');

module.exports = function(pinConfig) {
    assert(pinConfig.min >= 0, "no min value defined");
    assert(pinConfig.max > 0, "no max value defined");
    assert(pinConfig.min < pinConfig.max, "max must be bigger then min");

    // set default value at startup
    pinConfig.defaultValue = pinConfig.defaultValue || util.avg(pinConfig.min, pinConfig.max);
    output.setPwm(pinConfig, pinConfig.defaultValue);

    input.on(pinConfig.joystick + ':move', data => {
        let value = data.x;

        // 255: right
        // 128: straight
        // 0:   left
        if (pinConfig.reversed) {
            value = 255 - value;
        }

        let grad = util.map(
            value,
            controller.JOYSTICK_MIN,
            controller.JOYSTICK_MAX,
            pinConfig.min,
            pinConfig.max
        );

        output.setPwm(pinConfig, grad);
    });
};
