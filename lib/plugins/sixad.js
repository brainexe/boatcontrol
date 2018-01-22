const util = require('../util');

module.exports = function() {
    if (!util.isRoot()) {
        console.error("[Error]".red, "root access required to start sixad");
        return;
    }

    return util.exec(__dirname + '/../../sixad/sixad --stop --start --boot-yes');
};

