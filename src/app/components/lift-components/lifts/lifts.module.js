require('angular');

export default angular
    .module('liftsModule', []) 
        .directive('lifts', () => (
            {
                restrict: 'E',
                templateUrl: 'components/lift-components/lifts/lifts.html'
            }
        ))
    .name;