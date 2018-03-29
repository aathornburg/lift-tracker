require('angular');

import { Dropdown } from './Dropdown';
import { DropdownService } from './DropdownService';

export default angular
    .module('dropdownModule', [])
        .service('dropdownService', DropdownService)
        .directive('hasDropdown', (dropdownService) => (
            {
                restrict: 'A',
                controller: Dropdown,
                controllerAs: 'dropdownCtrl',
                link: {
                    pre: (scope, elem, attrs, dropdownCtrl) => {
                        dropdownService.register(scope, dropdownCtrl);
                    }
                }
            }
        ))
        .directive('dropdownButton', (dropdownService) => (
            {
                restrict: 'A',
                require: '^hasDropdown',
                link: (scope, elem, attrs, dropdownCtrl) => {
                    dropdownService.public.buttonInit(elem, dropdownCtrl.dropdownId);
                }
            }
        ))
        .directive('dropdownMenu', (dropdownService) => (
            {
                restrict: 'A',
                require: '^hasDropdown',
                link: (scope, elem, attrs, dropdownCtrl) => {
                    dropdownService.public.menuInit(elem, dropdownCtrl, dropdownCtrl.dropdownId)
                }
            }
        ))
    .name;