var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var config = require('./dbconfig');

mongoose.connect('mongodb://ds241668.mlab.com:41668/lift-tracker-db');

export { mongoose };