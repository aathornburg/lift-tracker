require('angular');

export default angular
    .module('addLiftWeightModule', [])
        .directive('addLiftWeight', () => (
            {
                restrict: 'E',
                templateUrl: 'components/add-lift-weight/add-lift-weight.html'
            }
        ))
    .name;