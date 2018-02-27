import { Lift } from "../model/Lift";

export class LiftsService {
    /* @ngInject */
    constructor($http) {
        this.$http = $http;
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
        this.$http.put('/api/lifts?lift=' + lift + '&weight=' + weight)
            .success((data, status, headers) => {
                alert("success!");
                this.lifts.push(new Lift(lift, weight));
            })
            .error((data, status, headers) => {
                console.log("DB write failure");
                // TODO:  Pop up error for user
            });
    }
}