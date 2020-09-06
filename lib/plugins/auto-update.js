const exec   = require('../util').exec;

module.exports = options => {
    console.log("[Plugin]".green, "git pull...");

    return exec('git pull --rebase --autostash');
};
