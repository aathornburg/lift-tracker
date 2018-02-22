var db = require('../configuration/db');

let get = (req, res, next) => {
    // TODO:  Try to hit this from the front end
    console.log("I hit this from the front end!")
}

let put = (req, res, next) => {
    Lift.create(
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