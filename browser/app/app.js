var app = angular.module('boatControl', []).controller('BoatController', function($scope) {
    var socket = io();

    $scope.messages = [];
    $scope.pins     = {};
    addMessage('booting...');

    function addMessage(message) {
        $scope.messages.push({
            text: message,
            time: Date.now()
        });
    }

    socket.on('output', function(data) {
        $scope.pins[data[2]] = [data[1], data[3]];

        addMessage(data.join(' - '));
        $scope.$apply();
    });

    socket.on('config', function(data) {
        $scope.config = data;
        console.log(data)
        $scope.$apply();
    });

    socket.on('connect', function() {
        addMessage('connected!');
        $scope.$apply();
    });

    socket.on('error', console.error.bind(console));
    socket.on('message', console.log.bind(console));

    $scope.submit = function(command) {
        socket.emit('output', '-1:' + command);
    };

    $scope.triggerEvent = function(event) {
        socket.emit('input', event);
    };
});

app.filter('slice', function() {
    return function(arr, start, end) {
        return arr.slice(start, end);
    };
});
