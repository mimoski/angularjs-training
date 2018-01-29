(function(){
    'use strict';
    
    angular
        .module('GithubViewer')
        .controller('MainController', ["$scope", "$interval", "$location", MainController]);
 
    function MainController($scope, $interval, $location){                 
   
        var countdownInterval = null;
        var startCountdown = function(){
            countdownInterval = $interval(function(){              
                $scope.countdown--;
                if($scope.countdown < 1){
                    $scope.search();
                }
            }, 1000, $scope.countdown);
        };

        $scope.search = function(){
            if(countdownInterval){                
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }            
            $location.path("/user/" + $scope.name);
        };
     
        $scope.countdown = 5;
        startCountdown();
    }

}());