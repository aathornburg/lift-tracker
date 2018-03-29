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

    removeLift(lift) {
        console.log("In removeLift, liftId: " + lift._id);
        this.$http.delete('/api/lifts/' + lift._id)
            .then((response, status, headers) => {
                this.lifts = this.lifts.filter(lift => lift._id !== response.data);
            })
            .catch((data, status, headers) => {
                console.log("DB delete failure");
                // TODO:  Pop up error for user
            });
    }

    updateLift(lift, weight) {
        console.log("In updateLift, lift: " + lift._id);
        this.$http.patch('/api/lifts/' + lift._id,
            {
                weight: weight
            })
            .then((resonse, status, headers) => {
                lift.weight = weight;
            })
            .catch((response, status, headers) => {
                // TODO:  Failure scenario
                console.log("Lift wasn't properly updated");
            });
    }

    storeAllLifts() {
        // this.$http.get('/api/lifts')
        //     .then((response, status, headers) => {
        //         this.lifts = response.data.lifts;
        //     })
        //     .catch((data, status, headers) => {
        //         // TODO:  Failure scenario
        //         console.log("Lifts were not received :(");
        //     });

        this.lifts = [
            {
                _id: 1,
                lift: "Bench press",
                weight: "135"
            },
            {
                _id: 1,
                lift: "Squat",
                weight: "135"
            },
            {
                _id: 1,
                lift: "Deadlift",
                weight: "135"
            },
            {
                _id: 1,
                lift: "Barbell row",
                weight: "135"
            },
            {
                _id: 1,
                lift: "Curl",
                weight: "135"
            }
        ]
    }
}