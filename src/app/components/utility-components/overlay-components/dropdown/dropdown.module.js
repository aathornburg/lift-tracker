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
                link: (scope, elem, attrs, dropdownCtrl) => {
                    dropdownService.public.dropdownInit(scope,
                        elem.find('[dropdown-menu]'),
                        elem.find('[dropdown-button]'),
                        dropdownCtrl
                    );
                }
            }
        ))
        .directive('dropdownButton', (dropdownService) => (
            {
                restrict: 'A',
                require: '^hasDropdown',
            }
        ))
        .directive('dropdownMenu', (dropdownService) => (
            {
                restrict: 'A',
                require: '^hasDropdown',
            }
        ))
    .name;