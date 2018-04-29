const assert = require('assert');

// disable all events when the button was pressed
module.exports = function(pinConfig, input) {
    assert(pinConfig.button, "no button defined");

    let muteEnabled = false;

    input.isIgnoredEvent = function(type) {
        return muteEnabled && type !== pinConfig.button + ":press";
    };

    input.on(pinConfig.button + ":press", function () {
        muteEnabled = !muteEnabled;
        console.log("Mute: " + muteEnabled)
    });
};
