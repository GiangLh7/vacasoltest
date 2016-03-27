/**
* Created by Administrator on 3/24/2016.
*/

angular.module('vacasol', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngLoading'])
    .config(['$locationProvider', '$routeProvider', '$mdThemingProvider', function($locationProvider, $routeProvider, $mdThemingProvider) {
        $locationProvider.html5Mode(true);

        $mdThemingProvider.theme('default')
            .primaryPalette('teal');

        $routeProvider.when('/', {
            templateUrl: "views/signup.html",
            controller: 'SignupCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'SignupCtrl'
        })
        .when('/confirm', {
            templateUrl: 'views/confirm.html',
            controller: 'ConfirmCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    }]);