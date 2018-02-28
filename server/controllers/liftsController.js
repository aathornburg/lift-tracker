import db from '../db';
import lift from '.././models/lift';

export default {
    get: (req, res, next) => {
        // TODO:  Try to hit this from the front end
        console.log("I hit this from the front end!");
        lift.find((err, lifts) => {
            if (err) {
                res.send(err);
            }

            res.json({lifts: lifts});
        });
    },
    put: (req, res, next) => {
        console.log("Trying to add lift: " + req.params['lift'] + " @ " + req.params['weight'] + " lbs");
        lift.create(
            {
                lift: req.params['lift'],
                weight: req.params['weight']
            },
            (err, errInstance) => {
                if (err) {
                    res.send(err);
                }

                res.send("Success?");
            }
        );
    }
}