require('angular');

import { Dropdown } from './Dropdown';

export default angular
    .module('dropdownModule', [])
        .directive('hasDropdown', () => (
            {
                restrict: 'A',
                controller: Dropdown,
                controllerAs: 'dropdownCtrl'
            }
        ))
        .directive('dropdownButton', () => (
            {
                require: '^hasDropdown',
                link: (scope, elem, attrs, dropdownCtrl) => {
                    elem.on('click', (e) => {
                        e.stopPropagation();

                        var toggleHandler = () => {
                            scope.$apply(dropdownCtrl.toggle());

                            if (dropdownCtrl.showMenu) {
                                console.log("Adding document listener");
                                $(document).on('click', toggleHandler);
                            } else {
                                console.log("Removing document listener");
                                $(document).off('click', toggleHandler);
                            }
                        }

                        toggleHandler();
                    });
                }
            }
        ))
        .directive('dropdownMenu', () => (
            {
                require: '^hasDropdown',
                link: (scope, elem, attr, dropdownCtrl) => {
                    scope.$watch('dropdownCtrl.showMenu', (newVal, oldVal) => {
                        if (newVal !== oldVal) {
                            if (newVal === true) {
                                elem.removeClass('ng-hide');
                            } else {
                                elem.addClass('ng-hide');
                            }
                        }
                    });
                }
            }
        ))
    .name;