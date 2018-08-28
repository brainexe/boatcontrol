const colors = require('colors');

module.exports = function(options) {
    const server = require('../server');
    const port = options.port || 3000;
    const host = options.host || "0.0.0.0";

    server.listen(port, host);
    require('dns').lookup(require('os').hostname(), function (err, ip) {
        console.log(colors.green('[Server]') + 'Start server at http://' + ip + ':' + port);
    })

};
