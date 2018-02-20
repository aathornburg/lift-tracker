var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

// ########  Configuration  ########

mongoose.connect('mongodb://<username>:<password>@ds241668.mlab.com:41668/lift-tracker-db');

app.use(morgan('dev')); // Logs all requests to console
app.use(bodyParser.json()); // Parse JSON

// ###########  Model  ###########

var Lift = mongoose.model('Lift', {
    lift : String,
    weight : Number
});

// ###########  Listen  ###########

app.listen(8080);
console.log('App listening on port 8080');