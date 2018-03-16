export class Lift {
    /* @ngInject */
    constructor(liftsService) {
        this.$liftsService = liftsService;

        this.showLiftMenu = false;
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

    showLiftOptions() {
        this.showLiftMenu = true;
    }
}