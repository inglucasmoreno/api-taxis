"use strict";
/*
    Desarrollador: Equinoccio Technology
    CEO: ing. Lucas Omar Moreno
    Año: 2021
    Tematica: API-REST SiMIV
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const express_1 = __importDefault(require("express"));
const chalk_1 = __importDefault(require("chalk"));
// Imports - Rutas
const usuarios_routes_1 = __importDefault(require("./routes/usuarios.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const taxis_routes_1 = __importDefault(require("./routes/taxis.routes"));
// [Express]
const app = express_1.default();
app.set('PORT', process.env.PORT || 3000);
app.use(require('cors')());
app.use(express_1.default.json());
app.use(express_1.default.static('src/public')); // Para prod solo 'public'
// [Rutas]
app.use('/getToken', auth_routes_1.default);
app.use('/usuarios', usuarios_routes_1.default);
app.use('/taxis', taxis_routes_1.default);
// Ejecución de servidor
app.listen(app.get('PORT'), () => {
    console.log(chalk_1.default.blue('[Desarrollador] - ') + 'Equinoccio Technology');
    console.log(chalk_1.default.blue('[Express] - ') + `Servidor corriendo en http://localhost:${app.get('PORT')}`);
});
