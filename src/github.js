(function () {

    var module = angular.module("GithubViewer");

    var github = function ($http, $sce) {

        var getUser = function (username) {

            return $http.get("https://api.github.com/users/" + username)
                .then(function (response) {
                    return {                
                        login: response.data.login,
                        id: response.data.id,
                        avatarUrl: $sce.trustAsResourceUrl(response.data.avatar_url),
                        reposUrl: response.data.repos_url
                    };
                }, function (error) {
                    return error;
                });
        };

        var getRepos = function (reposUrl) {
            return $http.get(reposUrl)
                .then(function (response) {
                    var repos = [];
                    for (var i = 0; i < response.data.length; i++) {
                        repos.push({ name: response.data[i].name, stars: response.data[i].stargazers_count, language: response.data[i].language });
                    }
                    return repos;
                }, function (error) {
                    return error;
                });
        };

        var getRepo = function(username, repoName){
            return $http.get("https://api.github.com/repos/" + username + "/" + repoName)
                .then(function(response){
                    return {
                        name: response.data.full_name,
                        contributorsUrl: response.data.contributors_url
                    };
                }, function(reason){
                    return reason;
                });
        };

        var getContributors = function(url){
            return $http.get(url)
                .then(function(response){
                    var contributors = [];
                    for (var i = 0; i < response.data.length; i++) {
                        contributors.push({ name: response.data[i].login, avatarUrl: $sce.trustAsResourceUrl(response.data[i].avatar_url) });
                    }
                    return contributors;
                }, function(error){
                    return error;
            });
        };

        return {
            getUser: getUser,
            getRepos: getRepos,
            getRepo: getRepo,
            getContributors: getContributors
        };
    };

    module.factory("github", ["$http", "$sce", github]);
}());