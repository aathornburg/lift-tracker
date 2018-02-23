import db from '../db';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default db.model('Lift', new Schema({
    lift: String,
    weight: { type: Number, min: 0 }
}));