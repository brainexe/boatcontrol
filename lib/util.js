
const exec = require('child_process').exec;

module.exports.exec = command => new Promise(resolve => {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error("[Error]".red, command, error, stdout, stderr);
        }

        resolve(error, stdout, stderr);
    });
});

module.exports.map = (x, in_min, in_max, out_min, out_max) => {
    x = Math.min(
        Math.max(
            x,
            in_min
        ),
        in_max
    );

    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};


module.exports.isRoot = function () {
    return process.getuid && process.getuid() === 0;
};
