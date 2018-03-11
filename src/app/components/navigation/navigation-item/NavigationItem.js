export class NavigationItem {
    /* @ngInject */
    constructor($state) {
        this.$state = $state;
    }

    isActive() {
        return this.$state.current.name === this.location;
    }
}