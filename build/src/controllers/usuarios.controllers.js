"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosController = void 0;
const chalk_1 = __importDefault(require("chalk"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const response_1 = require("../helpers/response");
const jwt_1 = require("../helpers/jwt");
const usuarios_model_1 = __importDefault(require("../models/usuarios.model"));
// Clase: Usuarios
class Usuarios {
    // Metodo: Usuario por ID
    getUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const usuario = yield usuarios_model_1.default.findById(id, 'usuario nombre apellido role email activo');
                if (!usuario)
                    return response_1.respuesta.error(res, 400, 'El usuario no existe');
                response_1.respuesta.success(res, { usuario });
            }
            catch (err) {
                console.log(chalk_1.default.red(err));
                response_1.respuesta.error(res, 500);
            }
        });
    }
    // Metodo: Listar usuarios
    listarUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { columna, direccion } = req.query;
                // Ordenar
                let ordenar = [columna || 'apellido', direccion || 1];
                // Ejecución de consulta
                const [usuarios, total] = yield Promise.all([
                    usuarios_model_1.default.find({}, 'usuario apellido nombre role email activo createdAt')
                        .sort([ordenar]),
                    usuarios_model_1.default.find().countDocuments()
                ]);
                response_1.respuesta.success(res, { usuarios, total });
            }
            catch (err) {
                console.log(chalk_1.default.red(err));
                response_1.respuesta.error(res, 500);
            }
        });
    }
    // Metodo: Nuevo usuario
    nuevoUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { usuario, password, email } = req.body;
                // Verificacion: Usuario repetido?
                const existeUsuario = yield usuarios_model_1.default.findOne({ usuario });
                if (existeUsuario)
                    return response_1.respuesta.error(res, 400, 'El usuario ya existe');
                // Verificacion: Email repetido?
                const existeEmail = yield usuarios_model_1.default.findOne({ email });
                if (existeEmail)
                    return response_1.respuesta.error(res, 400, 'Ese correo ya esta registrado');
                // Se crea la instancia de usuario
                const usuarioObj = new usuarios_model_1.default(req.body);
                // Se encript la contraseña
                const salt = bcryptjs_1.default.genSaltSync();
                usuarioObj.password = bcryptjs_1.default.hashSync(password, salt);
                // Se almacena en base de datos y se genera el token
                yield usuarioObj.save();
                const token = yield jwt_1.jsonwebtoken.generar(usuario.id);
                response_1.respuesta.success(res, {
                    usuario,
                    token
                });
            }
            catch (err) {
                console.log(chalk_1.default.red(err));
                response_1.respuesta.error(res, 500);
            }
        });
    }
    // Metodo: Actualizar usuario
    actualizarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { usuario, email, password } = req.body;
                const uid = req.params.id;
                // Verificacion: EL usuario existe?
                const usuarioDB = yield usuarios_model_1.default.findById(uid);
                if (!usuarioDB)
                    return response_1.respuesta.error(res, 400, 'El usuario no existe');
                // Verificacion: El Usuario esta registrado?
                if (usuario !== usuarioDB.usuario) {
                    const usuarioExiste = yield usuarios_model_1.default.findOne({ usuario });
                    if (usuarioExiste)
                        return response_1.respuesta.error(res, 400, 'El usuario ya esta registrado');
                }
                // Verificacion: El Correo ya esta registrado?
                if (email !== usuarioDB.email) {
                    const emailExiste = yield usuarios_model_1.default.findOne({ email });
                    if (emailExiste)
                        return response_1.respuesta.error(res, 400, 'Ese email ya esta registrado');
                }
                // Se encripta el password en caso de que sea necesario
                if (password) {
                    const salt = bcryptjs_1.default.genSaltSync();
                    req.body.password = bcryptjs_1.default.hashSync(password, salt);
                }
                // Se actualiza el usuario
                const usuarioRes = yield usuarios_model_1.default.findByIdAndUpdate(uid, req.body, { new: true });
                response_1.respuesta.success(res, { usuario: usuarioRes });
            }
            catch (err) {
                console.log(chalk_1.default.red(err));
                response_1.respuesta.error(res, 500);
            }
        });
    }
}
exports.UsuariosController = new Usuarios();
