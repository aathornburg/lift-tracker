export class Lift {
    /* @ngInject */
    constructor(liftsService) {
        this.$liftsService = liftsService;
    }

    /** public methods */
    remove() {
        this.$liftsService.removeLift(this.liftModel);
    }

    weightDown() {
        this.$liftsService.updateLift(this.liftModel, this.liftModel.weight - 5);
    }

    weightUp() {
        this.$liftsService.updateLift(this.liftModel, this.liftModel.weight + 5);
    }
}