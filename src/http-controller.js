(function(){
    'use strict';
    
    angular
        .module('app')
        .controller('HttpController', ["$scope", "$http", "$sce", "$interval", HttpController]);

    /** @ngInject */
    function HttpController($scope, $http, $sce, $interval){
      
        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };

        $scope.search = function(){
            search($scope.name);
        }

        $scope.countdown = 5;
        $interval(function(){
            $scope.countdown--;
        }, 1000, $scope.countdown);

        $scope.$watch("countdown", function(newValue, oldValue){
            if(newValue == 0){
                search($scope.name);            
            }
        })
        var search = function(text){
            $scope.countdown = 5;
            $http.get("https://api.github.com/users/" + text).then(
                function(response){
                    $scope.person = {
                        login: response.data.login,
                        id: response.data.id,
                        avatarUrl: $sce.trustAsResourceUrl(response.data.avatar_url)                        
                    };
                    $scope.sortOrder = "-stargazers_count";
                    $http.get(response.data.repos_url).then(
                        function(response){
                            $scope.person.repos = response.data;
                        },
                        function(reason){
                            $scope.error = reason;
                        }
                    )
                },
                function(reason){
                    $scope.error = reason;
                }
            );
        }
    }

}());