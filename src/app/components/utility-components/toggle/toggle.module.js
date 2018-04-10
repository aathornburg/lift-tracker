require('angular');

import { Toggle } from './Toggle';
import util from 'util';

export default angular
    .module('toggleModule', [])
        .directive('toggle', () => (
            {
                restrict: 'E',
                controller: Toggle,
                controllerAs: 'toggleCtrl',
                require: ['toggle', '?^ngModel'],
                templateUrl: 'components/utility-components/toggle/toggle.html',
                bindToController: {
                    toggleId: '@',
                    name: '@',
                    toggled: '@'
                },
                link: (scope, elem, attrs, ctrls) => {
                    let toggleCtrl = ctrls[0],
                        ngModelCtrl = ctrls[1];

                    scope.$watch('toggleCtrl.toggled', (newVal, oldVal) => {
                        ngModelCtrl.$setViewValue(toggleCtrl.toggled);
                    });

                    ngModelCtrl.$render = () => {
                        toggleCtrl.toggled = ngModelCtrl.$modelValue;
                    };
                }
            }
        ))
    .name;