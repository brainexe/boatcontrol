
module.exports = function(pin, input, output) {
    var speed    = pin.speed || 30;
    var minValue = pin.min   || 0;
    var maxValue = pin.max   || 180;

    var timer = null;
    var value;
    input.on(pin.button + ":press", function () {
        if (value) {
            output.setServo(pin, 0);
            value = 0;
            return;
        }

        value = minValue;
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
