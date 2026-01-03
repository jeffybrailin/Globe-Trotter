
import { Router } from 'express';
import { addStop, deleteStop, addActivity, deleteActivity } from '../controllers/itinerary.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
router.use(authenticateToken);

// Stops
router.post('/trips/:tripId/stops', addStop);
router.delete('/stops/:id', deleteStop);

// Activities
router.post('/stops/:stopId/activities', addActivity);
router.delete('/activities/:id', deleteActivity);

export default router;
