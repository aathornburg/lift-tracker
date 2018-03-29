require('angular');

import { Modal } from './Dropdown';

export default angular
    .module('modalModule', [])
        .directive('modal', () => (
            {
                restrict: 'A',
                controller: Modal,
                controllerAs: 'modalCtrl',
                link: (scope, elem, attrs, modalCtrl) => {
                }
            }
        ))
        .directive('modalOpen', () => (
            {
                restrict: 'A',
                require: '^hasDropdown',
                link: (scope, elem, attrs) => {
                }
            }
        ))
        .directive('modalClose', () => (
            {
                restrict: 'A',
                require: '^modal',
                link: (scope, elem, attrs, modalCtrl) => {
                }
            }
        ))
    .name;