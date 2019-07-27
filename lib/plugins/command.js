const assert = require('assert');
const exec   = require('../util').exec;

// executes any cli command on startup
module.exports = options => {
    assert(options.cmd, "cmd needs to be passed");

    console.log("[Plugin]".green, "Executing command:", options.cmd);

    return exec(options.cmd);
};
