require('angular');

import { Checkbox } from './Checkbox';

export default angular
    .module('checkboxModule', [])
        .directive('checkbox', () => (
            {
                restrict: 'E',
                controller: Checkbox,
                controllerAs: 'checkboxCtrl',
                require: ['checkbox', '?ngModel'],
                templateUrl: 'components/utility-components/form-components/checkbox/checkbox.html',
                scope: {},
                bindToController: {
                    checkboxId: '@',
                    name: '@',
                    checked: '<?'
                },
                link: (scope, elem, attrs, ctrls) => {
                    let checkboxCtrl = ctrls[0],
                        ngModelCtrl = ctrls[1];

                    ngModelCtrl.$setViewValue(checkboxCtrl.checked);

                    scope.$watch('checkboxCtrl.checked', (newVal, oldVal) => {
                        if (newVal !== oldVal) {
                            ngModelCtrl.$setViewValue(checkboxCtrl.checked);
                        }
                    });

                    ngModelCtrl.$render = () => {
                        if (ngModelCtrl.$viewValue !== undefined) {
                            checkboxCtrl.checked = ngModelCtrl.$viewValue;
                        }
                    };
                }
            }
        ))
    .name;