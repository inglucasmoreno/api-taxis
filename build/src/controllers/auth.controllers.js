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
exports.AuthController = void 0;
const chalk_1 = __importDefault(require("chalk"));
const database_1 = require("../database/database");
const response_1 = require("../helpers/response");
const jwt_1 = require("../helpers/jwt");
class Auth {
    // Metodo: Login de usuario
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userName, password } = req.body;
                const conn = yield database_1.connect();
                // Se verifica si el usuario y contraseña son correctos
                const usuarioDB = yield conn.query('SELECT * FROM users WHERE usuario = ? AND password = ?', [userName, password]);
                if (usuarioDB[0].length == 0)
                    return response_1.respuesta.error(res, 400, 'Los datos son incorrectos');
                // Se verifica si el usuario esta activo
                // Se genera el token
                const token = yield jwt_1.jsonwebtoken.generar(usuarioDB[0][0].id);
                response_1.respuesta.success(res, { token });
            }
            catch (err) {
                console.log(chalk_1.default.red(err));
                response_1.respuesta.error(res, 500);
            }
        });
    }
}
exports.AuthController = new Auth;
