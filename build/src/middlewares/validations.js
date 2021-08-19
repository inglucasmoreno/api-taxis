"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validaciones = void 0;
const chalk_1 = __importDefault(require("chalk"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = require("../helpers/response");
class Validations {
    // Metodo: Validacion de campos    
    campos(req, res, next) {
        const errores = express_validator_1.validationResult(req);
        if (!errores.isEmpty()) {
            return response_1.respuesta.error(res, 400, {
                errors: errores.mapped() // Podria ser tambien -> array()
            });
        }
        next();
    }
    // Metodo: Validacion de JWT
    jwt(req, res, next) {
        try {
            // ¿Viene x-token en cabecera?
            const token = req.header('x-token');
            if (!token)
                return response_1.respuesta.error(res, 401, 'No hay token en la peticion');
            // Se extrae el uid (ID de usuario del token) y se agrega en la peticion
            const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'EquinoccioKey');
            req.uid = data.uid;
            // Se continua hacia el controlador correspondiente
            next();
        }
        catch (err) {
            console.log(chalk_1.default.red(err));
            response_1.respuesta.error(res, 500);
        }
    }
}
exports.validaciones = new Validations();
