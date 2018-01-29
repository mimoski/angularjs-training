/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(3);
__webpack_require__(4);
module.exports = __webpack_require__(5);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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
                templateUrl: __webpack_require__(2),
                controller: "MainController"
            })
            .otherwise({redirectTo: "/main"});
    });
}());

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "<div>     \r\n    <div>\r\n        <div>\r\n            {{countdown}}\r\n        </div>                \r\n        <form name=\"MainForm\">\r\n            <input type=\"text\" name=\"Name\" ng-model=\"name\" placeholder=\"Search user\" />\r\n            <button type=\"submit\" value=\"Search\" ng-click=\"search()\">Search</button>\r\n        </form>\r\n    </div>            \r\n</div>";

/***/ }),
/* 3 */
/***/ (function(module, exports) {

(function(){
    
    var module = angular.module("GithubViewer");

    var github = function($http, $sce, $q){

        var getUser = function(username){
            return $http.get("https://api.github.com/users/" + username)
                .then(function(response){                   
                    return {
                        login: response.data.login,
                        id: response.data.id,
                        avatarUrl: $sce.trustAsResourceUrl(response.data.avatar_url),
                        reposUrl: response.data.reposUrl
                    };
                }, function(error){
                    return $q.reject(error);
                });
        };

        var getRepos = function(reposUrl){
            return $http.get(reposUrl)
                .then(function(response){
                    var repos = [];                   
                    for(var i = 0; i < response.data.length; i++){
                        repos.push({ name: response.data.name, stars: response.data.stargazers_count, language: response.data.language });
                    }
                    return repos;
                }, function(error){
                    return $q.reject(error);
                });
        };

        return {
            getUser: getUser,
            getRepos: getRepos
        };
    };

    module.factory("github", ["$http", "$sce", "$q", github]);
}());

/***/ }),
/* 4 */
/***/ (function(module, exports) {

(function(){
    'use strict';
    
    angular
        .module('GithubViewer')
        .controller('MainController', ["$scope", MainController]);
 
    function MainController($scope, $interval){                 

        var decrement = function(){
            $scope.countdown =- 1;
            if($scope.countdown < 1){
                $scope.search($scope.name);
            }
        };

        var countdownInterval = null;
        var startCountdown = function(){
            countdownInterval = $interval(function(){

            }, 1000, $scope.countdown);
        };

        $scope.search = function(){
            if(countdownInterval){
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }

        }
     
        $scope.countdown = 5;
    }

}());

// (function(){
//     'use strict';
    
//     angular
//         .module('GithubViewer')
//         .controller('MainController', ["$scope", "$interval", "github", MainController]);
 
//     function MainController($scope, $interval, github){            
//         $scope.name = "angular";
//         $scope.search = function(){
//             search($scope.name);
//         }
        
//         $interval(function(){
//             $scope.countdown--;
//             if($scope.countdown < 1){
//                 search($scope.name);   
//             }
//         }, 1000, $scope.countdown);
    
//         var search = function(username){                 
//             github.getUser(username).then(function(user){
//                 $scope.user = user; 
//                 console.log(user);
//                 github.getRepos($scope.user.reposUrl).then(function(repos){
//                     $scope.repos = repos;
//                 }, function(reason) { $scope.error = reason;});
//             }, function(reason) { $scope.error = reason;});                
//             $scope.sortOrder = "-stars";
//         };

//         $scope.countdown = 5;
//     }

// }());

/***/ }),
/* 5 */
/***/ (function(module, exports) {



/***/ })
/******/ ]);