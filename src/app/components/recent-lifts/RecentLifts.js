export class RecentLifts {
    /* @ngInject */
    constructor(liftsService) {
        this.$liftsService = liftsService;

        this.showAddLift = false;
    }

    /** public methods */
    getLifts() {
        return this.$liftsService.getLifts();
    }

    remove(lift) {
        this.$liftsService.removeLift(lift);
    }

    weightDown(lift) {
        this.$liftsService.updateLift(lift, lift.weight - 5);
    }

    weightUp(lift) {
        this.$liftsService.updateLift(lift, lift.weight + 5);
    }

    /** display methods */
    showAddLift() {
        return this.showAddLift;
    }

    toggleAddLift() {
        this.showAddLift = !this.showAddLift;
    }
}