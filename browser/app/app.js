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
    }, 2000);

    socket.on('output', function(data) {
        var parts = data.split(':');

        $scope.pins[parts[2]] = [parts[1], parts[3]];

        addMessage("Command: " + parts.slice(1).join(' - '));
        $scope.$apply();
    });

    socket.on('config', function(config) {
        console.log("Config:", config);

        $scope.config = config;
        $scope.pins   = config.pins;

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

        switch (parts[2]) {
            case 'hold':
                return;
            case 'move':
                $scope.joystick[parts[1]]['x'] = parameters.x;
                $scope.joystick[parts[1]]['y'] = parameters.y;
                break;
            case 'press':
            case 'release':
                if ($scope.config.controller.buttons[parts[1]]) {
                    $scope.config.controller.buttons[parts[1]].isPressed = parts[2] === 'press';
                }
            break;
        }

        addMessage("Event: " + parts.slice(1).join(' - '));
        $scope.$apply();
    });

    socket.on('error', console.error.bind(console));
    socket.on('message', console.log.bind(console));

    $scope.submitCommand = function(command) {
        socket.emit('output', '-1:' + command);
    };

    $scope.setValue = function(pin, type, value) {
        socket.emit('output', '-1:' + pin + ':' + type + ':' + value);
    };

    $scope.triggerEvent = function(event) {
        socket.emit('input', event);
    };
});

app.directive('pin', function() {
    return {
        restrict: 'E',
        template: '' +
            '<div ng-switch="status[0]">' +
                '<div ' +
                    'ng-switch-when="d" ' +
                    'ng-click="$scope.$parent.setValue(pin.pin, !!status[1])" ' +
                    'class="pin-{{status[0]}}-{{status[1]}}">' +
                '</div>' +
                '<div ng-switch-when="s">' +
                    '<div class="progress">' +
                        '<div class="progress-bar progress-bar-striped" style="width:{{(status[1] / pin.max)*100}}%">' +
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
