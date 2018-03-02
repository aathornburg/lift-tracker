import express from 'express';
import liftsController from '../controllers/liftsController';
const router = express.Router();

router.get('/', liftsController.get);
router.put('/', liftsController.put);
router.delete('/:liftId', liftsController.delete);

export { router as liftsRoutes };