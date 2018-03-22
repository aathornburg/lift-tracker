export class Dropdown {
    /* @ngInject */
    constructor() {
        this.showDropdown = false;
    }

    /** public methods */
    toggleDropdown() {
        this.showDropdown = !this.showDropdown;
    }
}