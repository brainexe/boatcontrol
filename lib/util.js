
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

/**
 * Calculates the avg of the given arguments
 *
 * @returns {number}
 */
module.exports.avg = () => {
    let num = 0;
    const length = arguments.length;
    if (!length) {
        return num;
    }

    for (let i = 0; i < length; i++) {
        num = num + arguments[i];
    }

    return num / length;
};


module.exports.isRoot = function () {
    return process.getuid && process.getuid() === 0;
};

Promise.prototype.delay = function(time) {
    let delay = function(time, v) {
        return new Promise(function(resolve) {
            setTimeout(resolve.bind(null, v), time)
        });
    };

    return this.then(function(v) {
        return delay(time, v);
    });
};
