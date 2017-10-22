
module.exports.map = function (x, in_min, in_max, out_min, out_max) {
    x = Math.min(
        Math.max(
            x,
            in_min
        ),
        in_max
    );

    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};
