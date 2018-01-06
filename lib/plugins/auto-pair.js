let exec = require('child_process').exec;
const CHECK_INTERVAL = 5000;

module.exports = function() {
    setInterval(function () {
        exec(__dirname + '/../../scripts/sixpair', function (err, stdout, stderr) {
            if (err) {
                console.error(`exec error: ${err}`);
                return;
            }

            console.log(stdout);
        });
    }, CHECK_INTERVAL)
};

