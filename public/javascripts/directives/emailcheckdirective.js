/**
 * Created by Administrator on 3/25/2016.
 */
angular.module('vacasol').directive('wcEmail', ['User','$loading', function(User, $loading){
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            element.bind('blur', function (e) {
                //ngModel.$setValidity('required', true);
                //ngModel.$setValidity('pattern', true);
                //ngModel.$setValidity('unique', true);
                //if (!ngModel || !element.val()) {
                //    ngModel.$setValidity('required', false);
                //    return;
                //};
                var keyProperty = scope.$eval(attrs.wcEmail);
                var currentValue = element.val().trim();
                //if(currentValue == null || currentValue.length <= 0) {
                //    ngModel.$setValidity('required', false);
                //    return;
                //}
                //else{
                    /*if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(currentValue))
                    {
                        ngModel.$setValidity('pattern', false);
                        return;
                    }*/
                //}
                if(ngModel.$valid) {
                    User.checkUniqueValue(keyProperty.property, currentValue)
                        .then(function (unique) {
                            //Ensure value that being checked hasn't changed since the Ajax call was made
                            if (currentValue == element.val()) {
                                ngModel.$setValidity('unique', unique);
                            }
                        }, function () {
                            //Probably want a more robust way to handle an error
                            ngModel.$setValidity('unique', true);
                        })
                        .finally(function () {
                        });
                }
            });
        }
    }
}]);
