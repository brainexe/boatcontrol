var app = angular.module('boatControl', []).controller('BoatController', function($scope) {
    var socket = io();

    $scope.logFilters = {
        'Event':   false,
        'Command': false
    };
    $scope.messages = [];
    $scope.pins     = {};
    $scope.joystick = {
        left:  {x:128, y:128},
        right: {x:128, y:128}
    };
    $scope.ping = null;

    addMessage('Loading data...');

    function addMessage(message) {
        for (var filter in $scope.logFilters) {
            if ($scope.logFilters[filter]) {
                return;
            }
        }

        if ($scope.messages.length > 10) {
            $scope.messages.shift();
        }
        $scope.messages.push({
            text: message,
            time: Date.now()
        });
    }

    setInterval(function () {
        var start = new Date().getTime();
        socket.emit('timePing', 1, function () {
            var diff = new Date().getTime() - start;
            $scope.ping = diff;
            $scope.$apply();
        });
    }, 5000);

    socket.on('output', function(data) {
        $scope.pins[data.pin] = data;

        addMessage("Command: " + JSON.stringify(data));
        $scope.$apply();
    });

    socket.on('config', function(config) {
        console.log("Config:", config);

        $scope.config = config;
        $scope.pins   = config.config.pinValues;

        addMessage('Config loaded from server');
        $scope.$apply();
    });

    socket.on('connect', function() {
        addMessage('Connected to server!');
        $scope.$apply();
    });

    socket.on('disconnect', function() {
        addMessage('DISCONNECTED from server!');
        $scope.$apply();
    });

    socket.on('debug', function(message) {
        addMessage("Debug: " + message);
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
        switch (parts[0]) {
            case 'output':
                return;
        }
        console.log("e:", $scope.joystick[parts[1]], parameters, parts)
        switch (parts[1]) {
            case 'hold':
                return;
            case 'move':
                $scope.joystick[parts[0]]['x'] = parameters.x;
                $scope.joystick[parts[0]]['y'] = parameters.y;
                break;
            case 'press':
            case 'release':
                if ($scope.config.controller.buttons[parts[0]]) {
                    $scope.config.controller.buttons[parts[0]].isPressed = parts[1] === 'press';
                }
            break;
        }

        addMessage("Event: " + event);
        $scope.$apply();
    });

    socket.on('error', console.error.bind(console));

    $scope.submitCommand = function(command) {
        socket.emit('output', '-1:' + command);
    };

    $scope.setValue = function(pin, type, value) {
        socket.emit('output', '-1:' + pin + ':' + type + ':' + value);
    };

    $scope.triggerEvent = function(event) {
        socket.emit('input', event);
    };

    $scope.onJoystickClick = function (joystickId, event) {
        console.log(joystickId, event.offsetX, event.offsetY);
        var data = {
            x: event.offsetX,
            y: event.offsetY
        };

        socket.emit('input', joystickId + ':move', data);
    };
});

app.directive('pin', function() {
    return {
        restrict: 'E',
        template: '' +
            '<div ng-switch="status.type">' +
                '<div ' +
                    'ng-switch-when="digital" ' +
                    'ng-click="$scope.$parent.setValue(pin.pin, !!status.value)" ' +
                    'class="pin-{{status.type}}-{{status.value}}">' +
                '</div>' +
                '<div ng-switch-when="servo">' +
                    '<div class="progress">' +
                        '<div class="progress-bar progress-bar-striped" style="width:{{(status.value / pin.max)*100}}%">' +
                        '</div>' +
                    '</div>' +
                    '{{status[1]}} / {{pin.max}}' +
                '</div>' +
                '<div ng-switch-default>' +
                    '{{status}}' +
                '</div>' +
            '</div>',
        scope: {
            pin : "=",
            status : "="
        }
    };
});

app.filter('slice', function() {
    return function(arr, start, end) {
        return arr.slice(start, end);
    };
});
