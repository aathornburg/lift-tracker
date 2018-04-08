require('angular');

import { Toggle } from './Toggle';

export default angular
    .module('toggleModule', [])
        .directive('toggle', () => (
            {
                require: '?^ngModel',
                restrict: 'E',
                templateUrl: 'components/utility-components/toggle/toggle.html',
                scope: {
                    toggleId: '@',
                    name: '@'
                },
                link: (scope, elem, attrs, ngModel) => {

                }
            }
        ))
    .name;