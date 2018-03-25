require('angular');

import { Dropdown } from './Dropdown';
import { DropdownHelper } from './DropdownHelper';

export default angular
    .module('dropdownModule', [])
        .directive('hasDropdown', () => (
            {
                restrict: 'A',
                controller: Dropdown,
                controllerAs: 'dropdownCtrl',
                link: {
                    pre: (scope, elem, attrs, dropdownCtrl) => {
                        dropdownCtrl.setHelper(new DropdownHelper(scope, dropdownCtrl));
                    }
                }
            }
        ))
        .directive('dropdownButton', () => (
            {
                require: '^hasDropdown',
                link: (scope, elem, attrs, dropdownCtrl) => {
                    dropdownCtrl.getHelper().public.buttonInit(elem);
                }
            }
        ))
        .directive('dropdownMenu', () => (
            {
                require: '^hasDropdown',
                link: (scope, elem, attrs, dropdownCtrl) => {
                    dropdownCtrl.getHelper().public.menuInit(elem, dropdownCtrl);
                }
            }
        ))
    .name;