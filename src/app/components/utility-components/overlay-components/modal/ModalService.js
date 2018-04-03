import { OverlayControl } from '.././OverlayControl';

import util from 'util';

export class ModalService extends OverlayControl {
    constructor() {
        super();
        this.modals = [];
        this.openModals = [];
        this.public = this.createPublicMethods();
    }

    createPublicMethods() {
        return (() => {
            const service = {
                constants: {
                    $modalContainer: $(".modal-container")
                },
                props: {
                    modals: {
                        add: (scope, modalId, elem, ctrl) => {
                            this.modals.push({
                                modalId,
                                scope,
                                elem,
                                ctrl
                            });
                        }
                    }
                },
                methods: {
                    getModal: (modalId) => {
                        return this.modals.find(
                            modal => modal.modalId === modalId
                        );
                    },
                    openModal: (modal) => {
                        service.constants.$modalContainer.removeClass('ng-hide');
                        modal.elem.removeClass('ng-hide');
                        this.overlayControl.trapTabKey(modal.modalId, modal.elem);
                        this.overlayControl.createEscapeKeyListener(modal.modalId, directive.modal.close.bind(this, modal)); // Do I need to .bind?
                        this.overlayControl.createOutsideClickListener(modal.modalId, modal.elem, directive.modal.close.bind(this, modal));
                    },
                    closeModal: (modal) => {
                        this.overlayControl.removeTrappedTabKey(modal.modalId, modal.elem);
                        this.overlayControl.removeEscapeKeyListener(modal.modalId);
                        this.overlayControl.removeOutsideClickListener(modal.modalId);
                        service.constants.$modalContainer.addClass('ng-hide');
                        modal.elem.addClass('ng-hide');
                    }
                }
            },
                directive = {
                    open: {
                        createClickListener: (elem, modal) => {
                            elem.on('click', (e) => {
                                e.stopPropagation();
                                directive.modal.open(modal);
                            });
                        },
                        init: (elem, modalIdToOpen) => {
                            directive.open.createClickListener(elem, service.methods.getModal(modalIdToOpen));
                        }
                    },
                    close: {
                        createButtonClickListener: (elem, modal) => {
                            elem.on('click', (e) => {
                                directive.modal.close(modal);
                            });
                        },
                        init: (elem, modalIdToClose) => {
                            directive.close.createButtonClickListener(elem, service.methods.getModal(modalIdToClose));
                        }
                    },
                    modal: {
                        open: (modal) => {
                            modal.scope.$apply(modal.ctrl.open());
                        },
                        close: (modal) => {
                            modal.scope.$apply(modal.ctrl.close());
                        },
                        createWatcher: (scope, elem, ctrl) => {
                            scope.$watch('modalCtrl.showModal', (newVal, oldVal) => {
                                if (newVal !== oldVal) {
                                    if (newVal === true) {
                                        service.methods.openModal(service.methods.getModal(ctrl.modalId));
                                    } else {
                                        service.methods.closeModal(service.methods.getModal(ctrl.modalId));
                                    }
                                }
                            })
                        },
                        init: (scope, elem, modalId, ctrl) => {
                            service.props.modals.add(scope, modalId, elem, ctrl);
                            directive.modal.createWatcher(scope, elem, ctrl);
                        }
                    }
                }

            return {
                initOpen: directive.open.init,
                initClose: directive.close.init,
                initModal: directive.modal.init
            };
        })();
    }
}