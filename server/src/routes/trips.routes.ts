
import { Router } from 'express';
import { listTrips, createTrip, getTrip, deleteTrip } from '../controllers/trips.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken); // Protect all trip routes

router.get('/', listTrips);
router.post('/', createTrip);
router.get('/:id', getTrip);
// router.put('/:id', updateTrip); // To be implemented
router.delete('/:id', deleteTrip);

export default router;
