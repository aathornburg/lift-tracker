export class AllLifts {
    /* @ngInject */
    constructor(liftsService) {
        this.$liftsService = liftsService;

        this.showAddLift = false;
    }

    /** public methods */
    getLifts() {
        return this.$liftsService.getLifts();
    }
}