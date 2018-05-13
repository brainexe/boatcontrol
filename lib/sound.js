
const config = require('./config');
const exec = require('./util').exec;
const executable = config.soundExecutable || 'mplayer';

/**
 * @param file
 * @returns {Promise}
 */
module.exports.playFile = file => {
    console.log('Play file '.blue + file);

    return exec(executable + ' ' + __dirname + '/sounds/' + file).then(() => {
        console.log('Played file '.blue + file);
    });
};
