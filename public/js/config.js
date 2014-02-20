'use strict';

//Setting up route
angular.module('sqwiggle-feed').config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {

        delete $httpProvider.defaults.headers.common["X-Requested-With"]

        $routeProvider.
        when('/stats', {
            templateUrl: 'public/views/stats.html'
        }).
       	when('/install', {
            templateUrl: 'public/views/install.html',
            controller: 'InstallController'
        }).
        when('/', {
            templateUrl: 'public/views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('sqwiggle-feed').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);