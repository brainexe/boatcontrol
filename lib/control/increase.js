
module.exports = function(pin, input, output) {
    var speed    = pin.speed || 20;
    var minValue = pin.min   || 0;
    var maxValue = pin.max   || 180;

    var timer = null;
    input.on(pin.button + ":press", function () {
        var value = minValue;
        if (timer) {
            output.setServo(pin, value);
            clearInterval(timer);
            timer = null;
            return;
        }
        timer = setInterval(function() {
            if (value >= maxValue) {
                clearInterval(timer);
                timer = null;
                return;
            }
            value++;
            output.setServo(pin, value);
        }, speed);
    });

    input.on(pin.button + ":release", function () {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    });
};
