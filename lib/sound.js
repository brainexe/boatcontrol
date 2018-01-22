
let config = require('./config');
const exec = require('child_process').exec;
const executable = config.soundExecutable || 'mplayer';

module.exports.playFile = function(file) {
    console.log('Play file '.blue + file);
    exec(executable + ' ' + __dirname + '/sounds/' + file, function(error, stdout, stderr) {
        console.log('Played file '.blue + file);
    });
};
