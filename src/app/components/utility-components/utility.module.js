require('angular');

import { Dropdown } from './dropdown/Dropdown';

export default angular
    .module('utilityModule', []) 
        .directive('hasDropdown', () => (
            {
                restrict: 'A',
                controller: Dropdown,
                controllerAs: 'dropdownCtrl'
            }
        ))
    .name;