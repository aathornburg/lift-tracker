export class Dropdown {
    /* @ngInject */
    constructor() {
        this.showMenu = false;
    }

    /** public methods */
    toggle() {
        this.showMenu = !this.showMenu;
    }
}