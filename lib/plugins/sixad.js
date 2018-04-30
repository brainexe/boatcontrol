const util  = require('../util'),
      fs    = require('fs'),
      sound = require('../sound');

const defaultPath = '/dev/input/js0';

module.exports = options => {
    const path = options.path || defaultPath;
    if (!util.isRoot()) {
        console.error("[Error]".red, "root access required to start sixad");
        return;
    }

    util.exec(__dirname + '/../../sixad/sixad --start');

    return new Promise(resolve => {
        const interval = setInterval(() => {
            if (fs.existsSync(path)) {
                clearInterval(interval);
                console.log("[Sixad] Found controller".green);
                sound.playFile('bing.mp3');
                resolve();
            }
            console.log('.');
        }, 1000);
    });
};

