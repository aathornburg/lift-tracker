require('angular');

import { Modal } from './Modal';
import { ModalService } from './ModalService';

export default angular
    .module('modalModule', [])
        .service('modalService', ModalService)
        .directive('modal', (modalService) => (
            {
                restrict: 'A',
                controller: Modal,
                controllerAs: 'modalCtrl',
                bindToController: {
                    modalId: '='
                },
                link: {
                    pre: (scope, elem, attrs, modalCtrl) => {
                        modalService.register(elem, modalCtrl.modalId);
                    }
                }
            }
        ))
        .directive('modalOpen', (modalService) => (
            {
                restrict: 'A',
                scope: {
                    modalOpen: '='
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
                    modalService.public.initClose(elem, modalCtrl.modalId);
                }
            }
        ))
    .name;