/**
 * Created by Administrator on 3/25/2016.
 */
angular.module('vacasol').directive('wcUnique', ['User', function(User){
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            element.bind('blur', function (e) {
                if (!ngModel || !element.val()) return;
                var keyProperty = scope.$eval(attrs.wcUnique);
                var currentValue = element.val();
                User.checkUniqueValue(keyProperty.property, currentValue)
                    .then(function (unique) {
                        //Ensure value that being checked hasn't changed since the Ajax call was made
                        if (currentValue == element.val()) {
                            ngModel.$setValidity('unique', unique);
                        }
                    }, function () {
                        //Probably want a more robust way to handle an error
                        ngModel.$setValidity('unique', true);
                    });
            });
        }
    }
}]);
