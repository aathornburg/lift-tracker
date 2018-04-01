export class ModalService {
    constructor() {
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
                vars: {
                    modals: {
                        add: (scope, modalId, elem, modalCtrl) => {
                            this.modals.push({
                                scope,
                                modalId,
                                elem,
                                modalCtrl
                            });
                        }
                    }
                },
                methods: {
                    generateNamespacedClickEvent: (modalId) => {
                        return 'click.' + modalId;
                    },
                    createOutsideClickListener: (modal) => {
                        $(document).on(service.methods.generateNamespacedClickEvent(modal.modalId), (e) => {
                            modal.scope.$apply(modal.modalCtrl.close());
                        });
                    },
                    removeOutsideClickListener: (modal) => {
                        $(document).off(service.methods.generateNamespacedClickEvent(modal.modalId));
                    },
                    getModal: (modalId) => {
                        return this.modals.find(
                            modal => modal.modalId === modalId
                        );
                    },
                    openModal: (modal) => {
                        service.methods.createOutsideClickListener(modal);
                        service.constants.$modalContainer.removeClass('ng-hide');
                        modal.elem.removeClass('ng-hide');
                    },
                    closeModal: (modal) => {
                        service.methods.removeOutsideClickListener(modal);
                        service.constants.$modalContainer.addClass('ng-hide');
                        modal.elem.addClass('ng-hide');
                    }
                }
            },
                open = {
                    createClickListener: (elem, modal) => {
                        elem.on('click', (e) => {
                            e.stopPropagation();
                            modal.scope.$apply(modal.modalCtrl.open());
                        });
                    },
                    init: (elem, modalIdToOpen) => {
                        open.createClickListener(elem, service.methods.getModal(modalIdToOpen));
                    }
                },
                close = {
                    createButtonClickListener: (elem, modal) => {
                        elem.on('click', (e) => {
                            modal.scope.$apply(modal.modalCtrl.close());
                        });
                    },
                    init: (elem, modalIdToClose) => {
                        close.createButtonClickListener(elem, service.methods.getModal(modalIdToClose));
                    }
                },
                modal = {
                    createWatcher: (scope, elem, modalCtrl) => {
                        scope.$watch('modalCtrl.showModal', (newVal, oldVal) => {
                            console.log("modalCtrl.showModal changed, newVal: " + newVal);
                            if (newVal !== oldVal) {
                                if (newVal === true) {
                                    console.log("ModalCtrl.showModal changed to true, showing " + modalCtrl.modalId);
                                    service.methods.openModal(service.methods.getModal(modalCtrl.modalId));
                                } else {
                                    service.methods.closeModal(service.methods.getModal(modalCtrl.modalId));
                                }
                            }
                        })
                    },
                    init: (scope, elem, modalId, modalCtrl) => {
                        service.vars.modals.add(scope, modalId, elem, modalCtrl);
                        modal.createWatcher(scope, elem, modalCtrl);
                    }
                }

            return {
                initOpen: open.init,
                initClose: close.init,
                initModal: modal.init
            };
        })();
    }
}