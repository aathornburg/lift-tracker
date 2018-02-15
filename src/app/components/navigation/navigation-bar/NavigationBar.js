require('angular');

export default class NavigationBar {
    /* ngInject */
    constructor() {
        this.navItems = [
            "Dashboard",
            "Goals",
            "Create Personal Workout"
        ];
    }

    getNavItems() {
        return this.navItems;
    }
}