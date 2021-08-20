import Router from 'express';
import { check } from 'express-validator';

import { validaciones } from '../middlewares/validations';
import { AuthController } from '../controllers/auth.controllers'

const router = Router();

// Login
// POST - http://localhost:3000/getToken
router.post('/',
        [
            check('usuario', 'El Usuario es obligatorio').not().isEmpty(),
            check('password', 'El password es obligatorio').not().isEmpty(),
            validaciones.campos
        ], 
        AuthController.login);

export default router;