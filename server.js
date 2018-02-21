var express = require('express');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

// ########  Configuration  ########

var db = mongoose.createConnection('mongodb://<username>:<password>@ds241668.mlab.com:41668/lift-tracker-db');

app.use(morgan('dev')); // Logs all requests to console
app.use(bodyParser.json()); // Parse JSON

// ###########  Model  ###########

var Lift = db.model('Lift', new Schema({
    lift : String,
    weight : { type: Number, min: 0 }
}));

// This created a lift and added it to the Lifts collection!
// Lift.create(
//     {
//         lift: "Bench press",
//         weight: 125
//     },
//     (err, errInstance) => {
//         if (err) {
//             console.log(err);
//         }
//     }
// );

// ###########  Listen  ###########

app.listen(8080);
console.log('App listening on port 8080');