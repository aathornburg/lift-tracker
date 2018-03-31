export class Modal {
    /* @ngInject */
    constructor(modalService) {
        this.showModal = false;
    }

    open() {
        console.log("showModal set to true for " + this.modalId);
        this.showModal = true;
    }

    close() {
        console.log("showModal set to false!");
        this.showModal = false;
    }
}