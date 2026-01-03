
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { run, get } from '../db';
import { z } from 'zod';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';

const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2)
});

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = RegisterSchema.parse(req.body);

        const existing = await get('SELECT id FROM users WHERE email = ?', [email]);
        if (existing) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const id = uuidv4();

        await run(
            'INSERT INTO users (id, email, passwordHash, name) VALUES (?, ?, ?, ?)',
            [id, email, hashedPassword, name]
        );

        const token = jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({ token, user: { id, email, name } });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: (error as z.ZodError).issues });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = LoginSchema.parse(req.body);

        const user = await get('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: (error as z.ZodError).issues });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
