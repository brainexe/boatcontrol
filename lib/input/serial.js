const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

function initialize(emitter, controllerType, options) {
    const port = new SerialPort(
        options.device || '/dev/ttyUSB0',
        {
            baudRate: options.baud_rate || 115200
        }
    );
    const parser = port.pipe(new Readline({delimiter: '\n'}));// Read the port data

    port.on("open", () => {
        console.log('serial port open');
    });

    parser.on('data', data => {
        if (data.indexOf('controller:') === 0) {
            let event = data.replace('controller:', '').replace("\r", '')
            let eventArray = event.split(':')

            let args = {};
            if (eventArray[1] == 'move') {
                event = eventArray.slice(0, 2).join(':')
                args['x'] = parseInt(eventArray[2]);
                args['x'] = parseInt(eventArray[3]);
            }

            emitter.emit.apply(emitter, [event, args]);

            return;
        }

        console.log(data);
    });

}

module.exports = (emitter, controllerType, options) => {
    initialize(emitter, controllerType, options || {});
};
