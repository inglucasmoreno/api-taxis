"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.respuesta = void 0;
// Clase respuesta personalizada
class Resp {
    // Metodo - Success
    success(res, msg) {
        if (typeof (msg) == 'object') {
            res.status(200).json(msg);
        }
        else {
            res.status(200).json({ msg });
        }
    }
    // Metodo - Error
    error(res, status, msg = "Error de servidor") {
        if (status === 500) {
            msg = "Error de servidor";
        }
        ;
        if (typeof (msg) == 'object') {
            return res.status(status).json(msg);
        }
        res.status(status).json({ msg });
    }
}
exports.respuesta = new Resp();
