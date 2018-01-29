(function(){

    var module = angular.module("GithubViewer");
    var RepoController = function($scope, github, $routeParams){               
        $scope.username = $routeParams.username;
        $scope.repo = $routeParams.repo;

        github.getRepo($scope.username, $scope.repo).then(function(repoData){
            $scope.repo = repoData;
           
            github.getContributors(repoData.contributorsUrl).then(function(contributors){           
                $scope.contributors = contributors;
            }).catch(function(error){
                $scope.error = error;
            });
        }).catch(function(error){
            $scope.error = error;
        });
    };

    module.controller("RepoController", ["$scope", "github", "$routeParams", RepoController]);        
}());