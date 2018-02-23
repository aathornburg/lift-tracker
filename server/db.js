import mongoose from 'mongoose';
import config from './dbconfig';

mongoose.connect('mongodb://ds241668.mlab.com:41668/lift-tracker-db', config);

export default mongoose;