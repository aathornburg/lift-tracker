export class Modal {
    /* @ngInject */
    constructor(modalService) {
        this.showModal = false;
    }

    open() {
        this.showModal = true;
    }

    close() {
        this.showModal = false;
    }
}