require('angular');

import { Toggle } from './Toggle';

export default angular
    .module('toggleModule', [])
        .directive('toggle', ($parse) => (
            {
                restrict: 'E',
                controller: Toggle,
                controllerAs: 'toggleCtrl',
                require: ['toggle', '?ngModel'],
                templateUrl: 'components/utility-components/form-components/toggle/toggle.html',
                scope: {},
                bindToController: {
                    toggleId: '@',
                    name: '@',
                    toggled: '<?'
                },
                link: (scope, elem, attrs, ctrls) => {
                    let toggleCtrl = ctrls[0],
                        ngModelCtrl = ctrls[1];

                    ngModelCtrl.$setViewValue(toggleCtrl.toggled);

                    scope.$watch('toggleCtrl.toggled', (newVal, oldVal) => {
                        if (newVal !== oldVal) {
                            ngModelCtrl.$setViewValue(toggleCtrl.toggled);
                        }
                    });

                    ngModelCtrl.$render = () => {
                        if (ngModelCtrl.$viewValue !== undefined) {
                            toggleCtrl.toggled = ngModelCtrl.$viewValue;
                        }
                    };
                }
            }
        ))
    .name;