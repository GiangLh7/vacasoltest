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
                    if(element.val()) {
                        ctrl.$setValidity('required', true);
                        ctrl.$setValidity('pattern', true);
                        ctrl.$setValidity('unique', true);
                    }
                    else{
                        ctrl.$setValidity('required', false);
                    }
                });
            }
        }
    });
