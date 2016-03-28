/**
 * Created by Administrator on 3/26/2016.
 *
 * Function: reset form validity whenever user starts typing again.
 */

angular.module('vacasol')
    .directive('serverError', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                element.on('keydown', function() {
                });
                element.on('blur', function() {
                    ctrl.$touched = true;
                });
                element.on('focus', function() {
                    ctrl.$touched = false;
                });
            }
        }
    });
