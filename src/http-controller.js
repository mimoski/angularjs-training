(function(){
    'use strict';
    
    angular
        .module('app')
        .controller('HttpController', ["$scope", "$http", "$sce", HttpController]);

    /** @ngInject */
    function HttpController($scope, $http, $sce){
      
        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };

        $scope.search = function(){
            search($scope.name);
        }

        var search = function(text){
            $http.get("https://api.github.com/users/" + text).then(
                function(response){
                    $scope.person = {
                        login: response.data.login,
                        id: response.data.id,
                        avatarUrl: $sce.trustAsResourceUrl(response.data.avatar_url)
                    }
                },
                function(reason){
                    $scope.error = reason;
                }
            );
        }
    }

}());