var app = angular.module('boatControl', []).controller('BoatController', function($scope) {
    var socket = io();

    $scope.messages = [];
    $scope.pins     = {};
    $scope.joystick = {
        left: {x:180, y:180},
        right: {x:180, y:180}
    };

    addMessage('booting...');

    function addMessage(message) {
        $scope.messages.push({
            text: message,
            time: Date.now()
        });
    }

    socket.on('output', function(data) {
        var parts = data.split(':');

        $scope.pins[parts[2]] = [parts[1], parts[3]];

        addMessage("Command: " + parts.slice(1).join(' - '));
        $scope.$apply();
    });

    socket.on('config', function(data) {
        $scope.config = data;
        console.log(data);
        $scope.$apply();
    });

    socket.on('connect', function() {
        addMessage('connected!');
        $scope.$apply();
    });

    socket.on('debug', function(message) {
        addMessage(message);
        $scope.$apply();
    });

    socket.on('event', function(event) {
        var parameters = {};
        var tmp = event.split('{');
        if (tmp.length > 1) {
            event = tmp[0].slice(0, -1);
            parameters = JSON.parse('{'+tmp[1]);
        }
        var parts = event.split(':');

        console.log(parts);
        console.log(parameters);

        if (parts[2] == 'move') {
            $scope.joystick[parts[1]]['x'] = parameters.x;
            $scope.joystick[parts[1]]['y'] = parameters.y;
        }
        addMessage("Event: " + parts.slice(1).join(' - '));
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
