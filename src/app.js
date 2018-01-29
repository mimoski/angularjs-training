(function(){
    'use strict';

    var module = angular
        .module('GithubViewer', [
            "ngSanitize",
            "ngRoute"
        ]);

    module.config(function($routeProvider){
        $routeProvider
            .when("/main", {
                template: require("./main.html"),
                controller: "MainController"
            })
            .when("/user/:username", {
                template: require("./user-details.html"),
                controller: "UserDetailsController"
            })
            .when("/repo/:username/:repo", {
                template: require("./repo.html"),
                controller: "RepoController"
            })
            .otherwise({redirectTo: "/main"});
    });
}());