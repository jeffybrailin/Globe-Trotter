
import { Request, Response } from 'express';
import { CITIES } from '../data/cities';

export const searchCities = (req: Request, res: Response) => {
    const query = (req.query.q as string || '').toLowerCase();

    if (!query) return res.json([]);

    const results = CITIES.filter(city =>
        city.name.toLowerCase().includes(query)
    ).slice(0, 10); // Limit to 10 suggestions

    res.json(results);
};

export const getCityImage = (req: Request, res: Response) => {
    const name = (req.query.name as string || '').toLowerCase();
    const city = CITIES.find(c => c.name.toLowerCase() === name);
    // If exact match not found, maybe return a placeholder or check fuzzy
    res.json({ image: city?.image || null });
}
