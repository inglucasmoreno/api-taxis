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
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const chalk_1 = __importDefault(require("chalk"));
const usuarios_model_1 = __importDefault(require("../models/usuarios.model"));
// Conexion a base de datos
const bdConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/multicaja', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
    console.log(chalk_1.default.green('[Equinoccio Technology]') + ' - Conexion a base de datos correcta');
});
// Inicializacion de usuarios
const initUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        usuario: 'admin',
        apellido: 'Admin',
        nombre: 'Admin',
        email: 'admin@gmail.com',
        role: 'ADMIN_ROLE',
        activo: true
    };
    // Generacion de password encriptado
    const salt = bcryptjs_1.default.genSaltSync();
    data.password = bcryptjs_1.default.hashSync('admin', salt);
    // Se crea y se almacena en la base de datos al usuario administrador
    const usuario = new usuarios_model_1.default(data);
    yield usuario.save();
    console.log(chalk_1.default.green('[Equinoccio Technology]') + ' - Usuario administrador creado');
    console.log(chalk_1.default.green('[Equinoccio Technology]') + ' - Usuario: admin | Password: admin');
});
// Principal: Inicializacion de base de datos
const initialization = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Conexion con MongoDB
        bdConnection();
        // Inicializacion de usuarios
        yield initUsers();
        console.log(chalk_1.default.green('[Equinoccio Technology]') + ' - Inicializacion completada');
    }
    catch (err) {
        console.log(err);
        throw new Error('Error al inicializar la base de datos');
    }
});
// Comienzo de inicialización
initialization();
