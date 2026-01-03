
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { run, get, all } from '../db';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth.middleware';

const CreateTripSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    startDate: z.string(),
    endDate: z.string(),
    coverImage: z.string().optional(),
    public: z.boolean().optional(),
    budget: z.number().optional()
});

import { toCamelCase } from '../utils/casing';

export const listTrips = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const trips = await all('SELECT * FROM trips WHERE user_id = ? ORDER BY start_date ASC', [userId]);
        res.json(toCamelCase(trips));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createTrip = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const {
            title, description, startDate, endDate, budget, isPublic,
            departureCity, destinationCity, scope, persona
        } = req.body;

        const id = uuidv4();
        await run(
            `INSERT INTO trips (
                id, user_id, title, description, start_date, end_date, budget, is_public,
                departure_city, destination_city, scope, persona
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                id, userId, title, description, startDate, endDate, budget, isPublic ? 1 : 0,
                departureCity, destinationCity, scope, persona
            ]
        );

        res.status(201).json({ id, ...req.body });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: (error as z.ZodError).issues });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export const getTrip = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.userId;

        const tripRaw = await get('SELECT * FROM trips WHERE id = ?', [id]);
        if (!tripRaw) return res.status(404).json({ error: 'Trip not found' });

        const trip = toCamelCase(tripRaw);

        // Check ownership or public visibility
        if (trip.userId !== userId && !trip.isPublic) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const stopsRaw = await all('SELECT * FROM stops WHERE trip_id = ? ORDER BY order_index ASC', [id]);
        const stops = toCamelCase(stopsRaw);

        const stopsWithActivities = await Promise.all(stops.map(async (stop: any) => {
            const activitiesRaw = await all('SELECT * FROM activities WHERE stop_id = ? ORDER BY date ASC', [stop.id]);
            const activities = toCamelCase(activitiesRaw);
            const stopCost = activities.reduce((acc: number, curr: any) => acc + (curr.cost || 0), 0);
            return { ...stop, activities, stopCost };
        }));

        const totalCost = stopsWithActivities.reduce((acc: number, curr: any) => acc + (curr.stopCost || 0), 0);

        res.json({ ...trip, stops: stopsWithActivities, totalCost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteTrip = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.userId;

        const trip = await get('SELECT * FROM trips WHERE id = ?', [id]);
        if (!trip) return res.status(404).json({ error: 'Trip not found' });
        if (trip.userId !== userId) return res.status(403).json({ error: 'Access denied' });

        await run('DELETE FROM trips WHERE id = ?', [id]);
        res.json({ message: 'Trip deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
