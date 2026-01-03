
import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { addActivity, deleteActivity } from '../controllers/activities.controller';

const router = Router();

router.post('/stops/:stopId/activities', authenticateToken, addActivity);
router.delete('/activities/:id', authenticateToken, deleteActivity);

export default router;
