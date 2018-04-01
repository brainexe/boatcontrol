const assert = require('assert');
const sounds = require('../sound');

let pinState = {};

module.exports = function(options, input) {
    assert(options.button, "no button defined");
    assert(options.file, "no file defined");

    let promise = null;
    input.on(options.button + ":press", () => {
        let id = options.button + '__' + options.pin;
        let value = !pinState[id];
        pinState[id] = value;

        // todo stop file
        promise = sounds.playFile(options.file)
    });
};
