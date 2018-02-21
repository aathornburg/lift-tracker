var express = require('express'),
    router = express.Router();

router.get('/', (req, res, next) => {
    // TODO:  Convert this to controller logic
    res.send('Hello World!');
});

export { router };