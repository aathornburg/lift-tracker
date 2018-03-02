export class RecentLifts {
    /* @ngInject */
    constructor(liftsService) {
        this.$liftsService = liftsService;
    }

    /** public methods */
    getLifts() {
        return this.$liftsService.getLifts();
    }

    remove(lift) {
        this.$liftsService.removeLift(lift._id);
    }

    weightDown(lift) {
        lift.weight -= 5;
    }

    weightUp(lift) {
        lift.weight += 5;
    }
}