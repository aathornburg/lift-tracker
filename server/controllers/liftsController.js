import db from '../db';
import Lift from '.././models/lift';

export default {
    get: (req, res, next) => {
        // TODO:  Try to hit this from the front end
        console.log("I hit this from the front end!");
        Lift.find(
            (err, lifts) => {
                if (err) {
                    res.send(err);
                }

                res.json({lifts: lifts});
            }
        );
    },
    put: (req, res, next) => {
        console.log("Trying to add lift: " + req.params['lift'] + " @ " + req.params['weight'] + " lbs");
        let lift = new Lift(req.body);
        lift.save(
            (err, errInstance) => {
                if (err) {
                    res.send(err);
                }

                res.send("Success?");
            }
        );
    },
    delete: (req, res, next) => {
        console.log("Trying to remove lift: " + req.params['liftId']);
        Lift.remove(
            {
                _id: req.params.liftId
            },
            (err, errInstance) => {
                if (err) {
                    res.send(err);
                }

                res.send(req.params.liftId);
            }
        );
    }
}