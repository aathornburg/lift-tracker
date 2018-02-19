import { Lift } from "../model/Lift";

export class LiftsService {
    /* @ngInject */
    constructor() {
        this.lifts = [
            new Lift("Bench press", 145)
        ];
        /** DB logic here */
    }

    /** public methods */
    getLifts() {
        return this.lifts;
    }

    storeLift(lift, weight) {
        this.lifts.push(new Lift(lift, weight));
    }
}