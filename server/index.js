import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

import { routes } from './routes/routes';

// Create our middleware app
var app = express();

// Configure the middleware app
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev')); // Logs all requests to console
app.use(bodyParser.json()); // Parse JSON
app.use('/api', routes); // Set default path for routes
app.get('*', (req, res, next) => { // Redirect all requests to the index.html so that ui-router can handle routes
    res.sendFile(__dirname + "/public/index.html");
})

// Start the middleware app
app.listen(8080);
console.log('App listening on port 8080');