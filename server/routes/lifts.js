var express = require('express'),
    router = express.Router();
var liftsController = require('../controllers/liftsController');

router.get('/', liftsController.get);
router.put('/', liftsController.put);

export { router };