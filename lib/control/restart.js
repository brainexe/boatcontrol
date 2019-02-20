const process = require('process'),
      input   = require('../input'),
      sound   = require('../sound');

module.exports = (pinConfig) => {
    input.on(pinConfig.button + ":press", () => {
        console.log('Stop process...'.blue);
        sound.playFile('shutdown.mp3').then(() => {
            process.exit(0);
        })
    });
};
