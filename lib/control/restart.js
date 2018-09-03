const process = require('process');
const sound   = require('../sound');

module.exports = (pinConfig, input) => {
    input.on(pinConfig.button + ":press", () => {
        console.log('Stop process...'.blue);
        sound.playFile('shutdown.mp3').then(() => {
            process.exit(0);
        })
    });
};
