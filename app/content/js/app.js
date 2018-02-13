var angular = require('angular');

var app = angular.module('angularjsSandbox', []);

app.controller('TestCtrl', function($scope) {
    this.title = 'this is a title';
});