import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

// ##########  Routes  ##########

import { liftsRoutes } from './routes/liftsRoutes';

var app = express();

// ########  Configuration  ########

app.use(morgan('dev')); // Logs all requests to console
app.use(bodyParser.json()); // Parse JSON
app.use('/lifts', liftsRoutes);

// ###########  Listen  ###########

app.listen(8080);
console.log('App listening on port 8080');