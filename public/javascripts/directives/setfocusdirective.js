/**
 * Created by Administrator on 3/25/2016.
 */
angular.module('vacasol').directive('focusMe', ['$parse','$timeout', function($parse, $timeout){
    return {
        //scope: true,   // optionally create a child scope
        link: function(scope, element, attrs) {
            var model = $parse(attrs.focusMe);
            scope.$watch(model, function(value) {
                if(value === true) {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            });
            // on blur event:

        }
    };
}]);