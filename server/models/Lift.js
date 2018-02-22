var db = require('../db');
var Schema = require('mongoose').Schema;

export default db.model('Lift', new Schema({
    lift: String,
    weight: { type: Number, min: 0 }
}));