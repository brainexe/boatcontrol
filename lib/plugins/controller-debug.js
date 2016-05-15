
module.exports = function(emitter, output) {
    emitter.on(function (type, data) {
        console.log(type, data);
    });
};
