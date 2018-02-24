import express from 'express';
import liftsController from '../controllers/liftsController';
var router = express.Router();

router.get('/', liftsController.get);
router.put('/', liftsController.put);

export { router as liftsRoutes };