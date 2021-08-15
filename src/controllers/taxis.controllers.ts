import {Request, Response} from 'express';
import chalk from 'chalk';

import { respuesta } from '../helpers/response';
import { connect } from '../database/database';

class Taxis {
    
    // Se devuelven
    async getDrivers(req: Request, res: Response) {
        const conn = await connect();
        const relaciones = await conn.query('SELECT * FROM relaciones');
        return res.json(relaciones[0]);
    }

    async createPosts(req: Request, res: Response) {
        const newPost = req.body;
        const conn = await connect();
        conn.query('INSERT INTO posts SET ?', [newPost]);
        return res.json({ message: 'Post Created' });
    }
  
}

export const TaxisController = new Taxis();
