require('angular');

export default angular
    .module('toggleModule', [])
        .directive('toggle', () => (
            {
                require: '?^ngModel',
                restrict: 'E',
                templateUrl: 'components/utility-components/toggle/toggle.html',
                scope: {
                    toggleId: '@',
                    name: '@',
                    state: '@'
                },
                link: (scope, elem, attrs, ngModel) => {
                    // TODO:  ngModel logic here
                }
            }
        ))
    .name;