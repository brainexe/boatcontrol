const assert = require('assert');
const sound  = require('../sound');

// disable all events when the button was pressed
module.exports = (pinConfig, input) => {
    assert(pinConfig.button, "no button defined");

    let muteEnabled = false;
    const muteEvent = pinConfig.button + ":press";

    input.isIgnoredEvent = type => muteEnabled && type !== muteEvent;

    input.on(muteEvent, () => {
        muteEnabled = !muteEnabled;
        console.log("[Control]".green + " Mute: " + muteEnabled);
        sound.playFile('bing.mp3');
    });
};
