import express from 'express';
const router = express.Router();

import { liftsRoutes } from './liftsRoutes';

router.use('/lifts', liftsRoutes);

export { router as routes };