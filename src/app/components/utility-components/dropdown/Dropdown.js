export class Dropdown {
    /* @ngInject */
    constructor() {
        this.showMenu = false;
    }

    toggle() {
        this.showMenu = !this.showMenu;
    }

    /** getter/setter so that we have one helper per dropdown */
    getHelper() {
        return this.dropdownHelper;
    }
    
    setHelper(dropdownHelper) { // 
        this.dropdownHelper = dropdownHelper;
    }

}