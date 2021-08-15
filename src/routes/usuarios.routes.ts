import Router from 'express';
import { check } from 'express-validator';

import { validaciones } from '../middlewares/validations';
import { UsuariosController } from '../controllers/usuarios.controllers'

const router = Router();

// Usuario por ID
// GET - http://localhost:3000/api/usuarios/:id 
router.get('/:id', validaciones.jwt, UsuariosController.getUsuario);

// Listar usuarios
// GET - http://localhost:3000/api/usuarios
// Parametros: columna | direccion
router.get('/', validaciones.jwt, UsuariosController.listarUsuarios);

// Nuevo usuario
// POST - http://localhost:3000/api/usuarios 
router.post('/', 
            [    
                validaciones.jwt,
                check('usuario', 'El Usuario es obligatorio').not().isEmpty(),
                check('apellido', 'El Apellido es obligatorio').not().isEmpty(),
                check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
                check('password', 'El Password es obligatorio').not().isEmpty(),
                check('email', 'El Email es obligatorio').not().isEmpty(),
                validaciones.campos
            ], UsuariosController.nuevoUsuario);

// Actualizar usuario
// PUT - http://localhost:3000/api/usuarios/:id 
router.put('/:id', validaciones.jwt, UsuariosController.actualizarUsuario);

export default router;