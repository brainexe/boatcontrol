var fs = require('fs');
var raw_config = require("./config");
var i;

var pins = {};
var raw_pins = raw_config['pins'];
if (raw_pins['monitors']) {
    for (i in pins['monitors']) {
        raw_pins['monitor_' + i + '_v'] = raw_pins['monitors'][i]['vertical'];
        raw_pins['monitor_' + i + '_r'] = raw_pins['monitors'][i]['rotate'];
    }
}

for (i in raw_pins) {
    if (raw_pins[i].pin) {
        var new_pin = raw_pins[i];
        var pin_id = new_pin['pin'];
        delete new_pin['pin'];

        pins[pin_id] = new_pin;
    }
}

var config = {
    baud: raw_config['serial_baud'],
    //debug: raw_config['debug'],
    pins: pins
};

var json = JSON.stringify(config).replace(/"/g, "'");

if (process.argv[2]) {
    var filename = process.argv[2];
    fs.readFile(filename, "utf8", function(err, data) {
        if (err) {
            throw err;
        }

        data = data.replace(/#define CONFIG ".*?"/, '#define CONFIG "' + json+ '"');

        fs.writeFile(filename, data, function(err) {
            if (err) throw err;
            console.log('done!');
        });
    });
}

console.log(json);
