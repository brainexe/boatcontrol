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
    $scope.loggingEnabled = false;
    $scope.showController = false;
    $scope.hostName = window.location.hostname;
    $scope.speakText = '';

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

    setInterval(() => {
        const start = new Date().getTime();
        socket.emit('timePing', 1, function () {
            const diff = new Date().getTime() - start;
            $scope.ping = diff;
            $scope.$apply();
        });
    }, 5000);

    socket.on('pinChange', function(pin) {
        var oldPins = $scope.config.devices[pin.device].actions;
        for (let idx in oldPins) {
            // todo optimize pin replacement
            let oldPin = oldPins[idx];
            if (oldPin.pin == pin.pin && oldPin.button == pin.button) {
                $scope.config.devices[pin.device].actions[idx] = pin;
                break;
            }
        }

        addMessage("Command: " + JSON.stringify(pin));
        console.log($scope.config);
        $scope.$apply();
    });

    socket.on('config', function(config) {
        console.log("Config:", config);

        $scope.config     = config.config;
        $scope.controller = config.controller;

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
        console.log("e:", $scope.joystick[parts[1]], parameters, parts);
        switch (parts[1]) {
            case 'hold':
                return;
            case 'move':
                $scope.joystick[parts[0]]['x'] = parameters.x;
                $scope.joystick[parts[0]]['y'] = parameters.y;
                break;
            case 'press':
            case 'release':
                if ($scope.controller.buttons[parts[0]]) {
                    $scope.controller.buttons[parts[0]].isPressed = parts[1] === 'press';
                }
            break;
        }

        addMessage("Event: " + event);
        $scope.$apply();
    });

    socket.on('error', console.error.bind(console));

    $scope.enableLog = function() {
        $scope.loggingEnabled = true;
    };

    $scope.displayController = function() {
        $scope.showController = true;
    };

    $scope.submitCommand = function(command) {
        // todo!?
        socket.emit('output', '-1:' + command);
    };

    $scope.setValue = function(pin, type, value) {
        socket.emit('output', '-1:' + pin + ':' + type + ':' + value);
    };

    $scope.triggerEvent = function() {
        socket.emit('input', ...arguments);
    };

    $scope.onJoystickClick = function (joystickId, event) {
        console.log(joystickId, event.offsetX, event.offsetY);
        const data = {
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
            '<div ng-switch="pin.outputType" ng-if="pin.pin">' +
                '<div ' +
                    'ng-switch-when="digital" ' +
                    'ng-click="$scope.$parent.setValue(pin.pin, !!pin.value)" ' +
                    'class="pin-{{pin.outputType}}-{{pin.value}}">' +
                '</div>' +
                '<div ng-switch-when="servo">' +
                    '<div class="progress">' +
                        '<div class="progress-bar progress-bar-striped" style="width:{{(pin.value / pin.max)*100}}%">' +
                        '</div>' +
                    '</div>' +
                    '{{pin.value}} / {{pin.max}}' +
                '</div>' +
                '<div ng-switch-default>' +
                '</div>' +
            '</div>',
        scope: {
            pin    : "=",
            status : "="
        }
    };
});

app.filter('slice', function() {
    return function(arr, start, end) {
        return arr.slice(start, end);
    };
});
