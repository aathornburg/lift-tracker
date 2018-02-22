var express = require('express');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

// ########  Configuration  ########

app.use(morgan('dev')); // Logs all requests to console
app.use(bodyParser.json()); // Parse JSON
app.use('/lifts', require('./routes/lifts'));

// ###########  Listen  ###########

app.listen(8080);
console.log('App listening on port 8080');