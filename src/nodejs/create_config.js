var fs = require('fs');
var raw_config = require("./config");
var i;

var pins = raw_config['pins'];
if (pins['monitors']) {
    for (i in pins['monitors']) {
        pins['monitor_' + i + '_v'] = pins['monitors'][i]['vertical'];
        pins['monitor_' + i + '_r'] = pins['monitors'][i]['rotate'];
    }
}

for (i in pins) {
    if (!pins[i].pin) {
        delete pins[i];
    }
}

var config = {
    baud:  raw_config['serial_baud'],
    //debug: raw_config['debug'],
    pins:  pins
};

var json = JSON.stringify(config).replace(/"/g, "'");

if (process.argv[2]) {
    var filename = process.argv[2];
    fs.readFile(filename, "utf8", function(err, data) {
        if (err) {
            throw err;
        }

        data = data.replace(/#define CONFIG ".*?"/, '#define CONFIG "' + json+ '"');
        console.log(data);

        fs.writeFile(filename, data, function(err) {
            if (err) throw err;
        });
    });
}
console.log(json);
