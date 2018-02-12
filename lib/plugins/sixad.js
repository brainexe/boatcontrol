const util = require('../util');
const fs = require('fs');

const path = '/dev/input/js0';

module.exports = function() {
    if (!util.isRoot()) {
        console.error("[Error]".red, "root access required to start sixad");
        return;
    }

    util.exec(__dirname + '/../../sixad/sixad --start');

    return new Promise(resolve => {
        const interval = setInterval(function () {
            if (fs.existsSync(path)) {
                clearInterval(interval);
                console.log("[Sixad] Found controller".green);
                resolve();
            }
            console.log('.');
        }, 1000);
    });
};

