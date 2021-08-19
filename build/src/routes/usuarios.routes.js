"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validations_1 = require("../middlewares/validations");
const usuarios_controllers_1 = require("../controllers/usuarios.controllers");
const router = express_1.default();
// Usuario por ID
// GET - http://localhost:3000/api/usuarios/:id 
router.get('/:id', validations_1.validaciones.jwt, usuarios_controllers_1.UsuariosController.getUsuario);
// Listar usuarios
// GET - http://localhost:3000/api/usuarios
// Parametros: columna | direccion
router.get('/', validations_1.validaciones.jwt, usuarios_controllers_1.UsuariosController.listarUsuarios);
// Nuevo usuario
// POST - http://localhost:3000/api/usuarios 
router.post('/', [
    validations_1.validaciones.jwt,
    express_validator_1.check('usuario', 'El Usuario es obligatorio').not().isEmpty(),
    express_validator_1.check('apellido', 'El Apellido es obligatorio').not().isEmpty(),
    express_validator_1.check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('password', 'El Password es obligatorio').not().isEmpty(),
    express_validator_1.check('email', 'El Email es obligatorio').not().isEmpty(),
    validations_1.validaciones.campos
], usuarios_controllers_1.UsuariosController.nuevoUsuario);
// Actualizar usuario
// PUT - http://localhost:3000/api/usuarios/:id 
router.put('/:id', validations_1.validaciones.jwt, usuarios_controllers_1.UsuariosController.actualizarUsuario);
exports.default = router;
