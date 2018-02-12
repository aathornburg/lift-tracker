var app = angular.module('app', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/inbox');

    $stateProvider
        .state('/inbox', {
            url: '/inbox',
            templateUrl: 'inbox.html',
            controller: 'InboxCtrl'
        })
        .state('/inbox/email/:id', {
            url: '/inbox/email/:id',
            templateUrl: 'views/email.html',
            controller: 'EmailCtrl',
            controllerAs: 'email'
        });
}]);

app.controller('InboxCtrl', function($scope) {
    $scope.title = "This is a title";
});

app.factory('InboxFactory', function($http) {
    var exports = {};

    exports.getMessages = function() {
        return $http.get('emails.json')
            .error(function (data) {
                console.log('There was an error!', data);
            });
    };
});