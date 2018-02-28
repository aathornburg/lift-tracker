import { Lift } from "../model/Lift";

export class LiftsService {
    /* @ngInject */
    constructor($http) {
        this.$http = $http;

        this.storeAllLifts();
    }

    /** public methods */
    getLifts() {
        return this.lifts;
    }

    storeLift(lift, weight) {
        this.$http.put('/api/lifts',
            {
                lift: lift,
                weight: weight
            })
            .then((data, status, headers) => {
                this.lifts.push(new Lift(lift, weight));
            })
            .catch((data, status, headers) => {
                console.log("DB write failure");
                // TODO:  Pop up error for user
            });
    }

    storeAllLifts() {
        this.$http.get('/api/lifts')
            .then((data, status, headers) => {
                this.lifts = data.data.lifts;
            })
            .catch((data, status, headers) => {
                // TODO:  Failure scenario
                console.log("Lifts were not received :(");
            });
    }
}