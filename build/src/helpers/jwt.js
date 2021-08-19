"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonwebtoken = void 0;
const chalk_1 = __importDefault(require("chalk"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Clase - JsonWebToken
class Jwt {
    generar(uid) {
        return new Promise((resolve, reject) => {
            const payload = { uid };
            jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'EquinoccioKey', {
                expiresIn: '5h'
            }, (err, token) => {
                if (err) {
                    console.log(chalk_1.default.red(err));
                    reject('No se pudo generar el token');
                }
                else {
                    resolve(token);
                }
            });
        });
    }
}
exports.jsonwebtoken = new Jwt();
