export class ModalService {
    constructor() {
        this.modals = [];
        this.openModals = [];
        this.public = this.createPublicMethods();
    }

    register(elem, modalId) {
        this.modals.push({
            modalId,
            elem
        });
    }

    createPublicMethods() {
        return (() => {
            const service = {
                methods: {
                    openModal: (modalId) => {
                        console.log("Opening " + modalId);
                    },
                    closeModal: (modalId) => {
                        
                    }
                }
            },
                open = {
                    createClickListener: (elem, modalId) => {
                        elem.on('click', (e) => {
                            service.methods.openModal(modalId);
                        });
                    },
                    init: (elem, modalIdToOpen) => {
                        open.createClickListener(elem, modalIdToOpen);
                    }
                },
                close = {
                    createButtonClickListener: (elem, modalId) => {
                        elem.on('click', (e) => {
                            service.methods.closeModal(modalId);
                        });
                    },
                    init: (elem, modalIdToClose) => {
                        close.createButtonClickListener(elem, modalIdToClose);
                    }
                }

            return {
                initOpen: open.init,
                initClose: close.init
            };
        })();
    }
}