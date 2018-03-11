require('angular');

export default angular
    .module('goalsModule', []) 
        .directive('goals', () => (
            {
                restrict: 'E',
                templateUrl: 'components/goals/goals.html'
            }
        ))
    .name;