(function(){

    var module = angular.module("GithubViewer");
    var UserDetailsController = function($scope, github, $routeParams){               
        $scope.username = $routeParams.username;
        github.getUser($scope.username).then(function(user){
            $scope.user = user;           
            github.getRepos(user.reposUrl).then(function(repos){                    
                $scope.repos = repos;
            }).catch(function(error){
                $scope.error = error;
            });
        }).catch(function(error){
            $scope.error = error;
        });
    };

    module.controller("UserDetailsController", ["$scope", "github", "$routeParams", UserDetailsController]);        
}());