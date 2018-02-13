var angular = require('angular');

angular.directive('navigationBar', () => {
    return {
        restrict: 'E',
        templateUrl: 'navigation-bar.html',
        controller: 'NavigationBarCtrl'
    };
});