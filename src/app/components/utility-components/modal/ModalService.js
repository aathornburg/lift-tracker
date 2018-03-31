export class ModalService {
    constructor() {
        this.modals = [];
        this.openModals = [];
        this.public = this.createPublicMethods();
    }

    createPublicMethods() {
        return (() => {
            const service = {
                vars: {
                    modals: {
                        add: (scope, modalId, elem, modalCtrl) => {
                            console.log("Registering modal " + modalId);
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
                    getModal: (modalId) => {
                        console.log("Trying to find modal " + modalId);
                        console.log("All registered modals: " + this.modals);
                        return this.modals.find(
                            modal => modal.modalId === modalId
                        );
                    },
                    openModal: (modalId) => {
                        console.log("Opening " + modalId);
                        let modal = service.methods.getModal(modalId);
                        console.log("Modal about to be opened: " + modal);
                        modal.elem.removeClass('ng-hide');
                    },
                    closeModal: (modalId) => {
                        let modal = service.methods.getModal(modalId);
                        modal.elem.addClass('ng-hide');
                    }
                }
            },
                open = {
                    createClickListener: (elem, modalId) => {
                        let modal = service.methods.getModal(modalId);
                        elem.on('click', (e) => {
                            modal.scope.$apply(modal.modalCtrl.open());
                        });
                    },
                    init: (elem, modalIdToOpen) => {
                        open.createClickListener(elem, modalIdToOpen);
                    }
                },
                close = {
                    createButtonClickListener: (elem, modalId) => {
                        let modal = service.methods.getModal(modalId);
                        elem.on('click', (e) => {
                            modal.scope.$apply(modal.modalCtrl.close());
                        });
                    },
                    init: (elem, modalIdToClose) => {
                        close.createButtonClickListener(elem, modalIdToClose);
                    }
                },
                modal = {
                    createWatcher: (scope, elem, modalCtrl) => {
                        scope.$watch('modalCtrl.showModal', (newVal, oldVal) => {
                            console.log("showModal changed!");
                            if (newVal !== oldVal) {
                                if (newVal === true) {
                                    console.log("We're about to show a modal");
                                    service.methods.openModal(modalCtrl.modalId);
                                } else {
                                    service.methods.closeModal(modalCtrl.modalId);
                                }
                            }
                        })
                    },
                    init: (scope, elem, modalId, modalCtrl) => {
                        console.log("In modal init");
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