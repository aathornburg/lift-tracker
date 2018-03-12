export class AddLiftWeight {
    /* @ngInject */
    constructor(liftsService) {
        this.$liftsService = liftsService;
    }

    /** public methods */
    submitForm() {
        this.$liftsService.storeLift(
            this.addLiftForm.lift,
            this.addLiftForm.weight
        );
    }
}