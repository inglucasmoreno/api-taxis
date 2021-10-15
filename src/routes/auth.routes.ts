import Router from 'express';
import { check } from 'express-validator';

import { validaciones } from '../middlewares/validations';
import { AuthController } from '../controllers/auth.controllers';

// Limitacion de 3 solicitudes por segundo
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({ windowMs: 1000, max: 3 });
const router = Router();

// Login
// POST - http://localhost:3000/getToken
router.post('/',
        [
            limiter,
            check('userName', 'El Usuario es obligatorio').not().isEmpty(),
            check('password', 'El password es obligatorio').not().isEmpty(),
            validaciones.campos
        ], 
        AuthController.login);

export default router;