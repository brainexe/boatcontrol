
const exec = require('child_process').exec;

module.exports = function(options) {
    const server = options.serverCommand || `ffserver -f ${__dirname}/../config/ffserver.conf`;
    const ffmpeg = options.ffmpegCommand || 'ffmpeg -r 20 -s 720x576 -i /dev/video0 http://localhost:8090/boat.ffm';

    exec(server);

    setTimeout(() => {
        console.log('[Webcam]'.green, 'start webcam on port 8090');
        exec(ffmpeg);
    }, 2000)

};

