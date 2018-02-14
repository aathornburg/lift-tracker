require('angular');

export default class NavigationBar {
    /* ngInject */
    constructor() {
        this.navItems = [
            "Home",
            "Browse",
            "Search"
        ];
    }

    getNavItems() {
        return this.navItems;
    }
}