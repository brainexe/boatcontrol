const process = require('process');
const sound   = require('../sound');

module.exports = function (pinConfig, input) {
    input.on(pinConfig.button + ":press", () => {
        sound.playFile('bing.mp3');

        console.log('Stop process...'.blue);
        process.exit(0);
    });
};
