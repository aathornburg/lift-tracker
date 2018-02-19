export class Lift {
    /* @ngInject */
    constructor(lift, weight) {
        this.lift = lift;
        this.weight = weight;
    }

    getLift() {
        return this.lift;
    }

    getWeight() {
        return this.weight;
    }
}