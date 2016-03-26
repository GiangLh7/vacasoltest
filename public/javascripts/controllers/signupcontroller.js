/**
 * Created by Administrator on 3/24/2016.
 */
angular.module('vacasol').controller('SignupCtrl', ['$scope','$location', '$loading', 'User', function ($scope,$location,$loading, User) {
    var self = this;
    $scope.user = {
        firstName: null,
        lastName: null,
        email: null,
        languages: [],
        isAcceptedTermAndCondition: null
    };
    $scope.serverErrors = $scope.serverErrors || {};

    self.isProcessing = false;
    self.languages = ['English', 'Danish', 'Italian', 'Russian', 'Spanish', 'Arabic',
                    'China', 'Vietnamese','Portugal',
                    'Japanese', 'French','Korean' ];
    self.selectedItem = null;
    self.searchText = null;
    self.languagesSearch = languagesSearch;


    function languagesSearch(query) {
        var results = query ? self.languages.filter(createFilterFor(query)) : [];
        return results;
    }

    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(language) {
            return (language.toLowerCase().indexOf(lowercaseQuery) === 0);
        };
    }

    $scope.signup = function() {
        $loading.start('signup');
        User.signup($scope.user).then(function (response) {
            if(response.success) {
                $location.path('/confirm');
            }
            else {

            }
        }).catch(function(err) {
            console.log(err);
        })
        .finally(function () {
            setTimeout(function() {
                $loading.finish('signup');
            }, 4000);
        });
    };
    $scope.appendLanguageChip = function(language) {
        if($scope.user.languages.length > 5) {
            $scope.user.languages.pop();
        }
    };
}]);