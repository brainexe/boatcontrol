var exec = require('child_process').exec;

module.exports = function() {
    exec(__dirname + '/../../sixad/sixad --stop --start --boot-yes', function (err, stdout, stderr) {
        if (err) {
            console.error(`exec error: ${err}`);
            return;
        }

        console.log(stdout);
    });
};

