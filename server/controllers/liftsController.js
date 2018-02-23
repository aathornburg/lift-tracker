import db from '../db';
import lift from '.././models/lift';

export default {
    get: (req, res, next) => {
        // TODO:  Try to hit this from the front end
        console.log("I hit this from the front end!");
        res.send("Yay!");
    },
    put: (req, res, next) => {
        lift.create(
            {
                lift: req.body.lift,
                weight: req.body.weight
            },
            (err, errInstance) => {
                if (err) {
                    console.log(err);
                }
            }
        );
    }
}