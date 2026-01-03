
import { Router } from 'express';
import { searchCities, getCityImage } from '../controllers/search.controller';

const router = Router();

router.get('/cities', searchCities);
router.get('/city-image', getCityImage);

export default router;
