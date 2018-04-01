const assert = require('assert');

// disable all events when the button was pressed
module.exports = function(pinConfig, input) {
    assert(pinConfig.button, "no button defined");

    let enabled = true;

    let ignoreFunction = function(event, value) {
        return false;
    };
    // todo
    input.on(pinConfig.button + ":press", function () {
        if (enabled) {
            input.prependAny(ignoreFunction);
            enabled = true;
        } else {
            input.off(ignoreFunction());
            enabled = false;
        }
    });
};
