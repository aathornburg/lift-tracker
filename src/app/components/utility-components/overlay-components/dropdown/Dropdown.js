export class Dropdown {
    /* @ngInject */
    constructor(dropdownService) {
        this.showMenu = false;
        this.dropdownId = dropdownService.generateDropdownId();
    }

    toggle() {
        this.showMenu = !this.showMenu;
    }
}