
const sound = require('../sound');

module.exports = options => {
    const soundFile = options.file || 'bing.mp3';

    sound.playFile(soundFile);
};
