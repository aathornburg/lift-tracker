require('angular');

import { Modal } from './Modal';
import { ModalService } from './ModalService';

export default angular
    .module('modalModule', [])
        .service('modalService', ModalService)
        .directive('modalContainer', () => (
            {
                restrict: 'E',
                replace: true,
                templateUrl: 'components/utility-components/modal/modal-container.html'
            }
        ))
        .directive('modal', (modalService) => (
            {
                restrict: 'A',
                controller: Modal,
                controllerAs: 'modalCtrl',
                bindToController: {
                    modalId: '@'
                },
                link: {
                    pre: (scope, elem, attrs, modalCtrl) => {
                        console.log("modal-id: " + attrs.modalId);
                        modalService.public.initModal(scope, elem, attrs.modalId, modalCtrl);
                    }
                }
            }
        ))
        .directive('modalOpen', (modalService) => (
            {
                restrict: 'A',
                scope: {
                    modalOpen: '@'
                },
                link: (scope, elem, attrs) => {
                    modalService.public.initOpen(elem, attrs.modalOpen);
                }
            }
        ))
        .directive('modalClose', (modalService) => (
            {
                restrict: 'A',
                require: '^modal',
                link: (scope, elem, attrs, modalCtrl) => {
                    console.log("In modal-close, modalId: " + modalCtrl.modalId);
                    modalService.public.initClose(elem, modalCtrl.modalId);
                }
            }
        ))
    .name;