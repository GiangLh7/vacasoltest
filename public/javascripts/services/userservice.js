/**
 * Created by Administrator on 3/25/2016.
 */
angular.module('vacasol')
    .service('User', ['$q', '$http', function($q, $http) {
        var serviceBase = '/api/user/';
        this.signup = function(user) {
            var d = $q.defer();
            $http.post(serviceBase + 'signup',user).then(function successCallback(response) {
                d.resolve(response.data);
            }, function errorCallback(err) {
                d.resolve(err.data);
            });
            return d.promise;
        }
        this.checkUniqueValue = function (property, value) {
            return $http.get(serviceBase + 'checkUnique?property=' + property + '&value=' + escape(value)).then(
                function (results) {
                    return results.data.status;
            });
        };
    }]);