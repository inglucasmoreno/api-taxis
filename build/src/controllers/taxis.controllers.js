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
exports.TaxisController = void 0;
const response_1 = require("../helpers/response");
const database_1 = require("../database/database");
const chalk_1 = __importDefault(require("chalk"));
class Taxis {
    // Se devuelven los datos
    getData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Se obtiene el DNI y la patente
            const { dni, patente } = req.body;
            // Conexion a la base de datos
            const conn = yield database_1.connect();
            // Se traen los datos de la persona    
            const persona = yield conn.query("SELECT * FROM personas WHERE identificacion=? AND fecha_nacimiento=?", [dni]);
            // Existe un usuario habilitado?
            if (!persona[0][0])
                response_1.respuesta.error(res, 404, 'No autorizado');
            // Se traen los datos del vehiculo
            // const myQuery = `
            //     SELECT id_vehiculo, marca, modelo, dominio, motor, chasis, capacidad, nro_ordenanza, colores.descripcion AS 'color', tipo_servicio.descripcion AS 'servicio', tipo_situacion.descripcion AS 'situacion' 
            //     FROM vehiculos 
            //     INNER JOIN colores 
            //     ON colores.id_color=vehiculos.id_color 
            //     INNER JOIN tipo_servicio
            //     ON tipo_servicio.id_tipo=vehiculos.id_tipo
            //     INNER JOIN tipo_situacion
            //     ON tipo_situacion.id_situacion=vehiculos.situacion
            //     WHERE dominio=? AND vehiculos.activo='1' AND vehiculos.situacion='1'  
            // `
            // const myQuery = `
            //     SELECT id_vehiculo, marca, modelo, dominio, motor, chasis, capacidad, nro_ordenanza, colores.descripcion AS 'color', tipo_servicio.descripcion AS 'servicio', tipo_situacion.descripcion AS 'situacion' 
            //     FROM vehiculos 
            //     INNER JOIN colores ON colores.id_color=vehiculos.id_color 
            //     INNER JOIN tipo_servicio
            //     ON tipo_servicio.id_tipo=vehiculos.id_tipo
            //     INNER JOIN tipo_situacion
            //     ON tipo_situacion.id_situacion=vehiculos.situacion
            //     WHERE dominio=? AND vehiculos.activo='1' AND vehiculos.situacion='1'  
            // `
            const myQuery = `
            SELECT id_vehiculo, marca, modelo, nuevo as dominio, motor, chasis, capacidad, nro_ordenanza, colores.descripcion AS 'color', tipo_servicio.descripcion AS 'servicio', tipo_situacion.descripcion AS 'situacion'  
            FROM ((SELECT *, REPLACE(REPLACE(dominio,'-',''),' ','') as nuevo FROM vehiculos) as temporal) 
            INNER JOIN colores ON colores.id_color=temporal.id_color
            INNER JOIN tipo_servicio ON tipo_servicio.id_tipo=temporal.id_tipo
            INNER JOIN tipo_situacion ON tipo_situacion.id_situacion=temporal.situacion
            WHERE nuevo=? AND temporal.activo='1' AND temporal.situacion='1'  
        `;
            const vehiculo = yield conn.query(myQuery, [patente.toUpperCase().replace('-', '').replace(' ', '')]);
            // Existe un vehiculo habilitado?
            if (!vehiculo[0][0])
                response_1.respuesta.error(res, 404, 'No autorizado');
            // Se determina si la persona es chofer y esta autorizada a manejar ese vehiculo
            const autorizado = yield conn.query("SELECT * FROM relaciones WHERE id_vehiculo=? AND id_persona=? AND activo='1'", [vehiculo[0][0].id_vehiculo, persona[0][0].id_persona]);
            if (autorizado[0][0]) {
                const data = {
                    marca: vehiculo[0][0].marca,
                    modelo: vehiculo[0][0].modelo,
                    patente: vehiculo[0][0].dominio,
                    color: vehiculo[0][0].color,
                };
                response_1.respuesta.success(res, { vehiculo: data });
            }
            else {
                response_1.respuesta.error(res, 404, 'No autorizado');
            }
        });
    }
    // Obtener datos de titular
    getCabOwner(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { dni, fecha_nacimiento } = req.params;
                // Conexion a la base de datos
                const conn = yield database_1.connect();
                // Datos de persona
                const myQuery_persona = `SELECT * FROM personas WHERE identificacion=? AND fecha_nacimiento=?`;
                const persona = yield conn.query(myQuery_persona, [dni, fecha_nacimiento]);
                // Error: Usuario no encontrado
                if (!persona[0][0])
                    return response_1.respuesta.error(res, 400, "Datos incorrectos");
                // Relaciones
                const myQuery_relaciones = `
                SELECT vehiculos.dominio as licensePlate, vehiculos.nro_licencia as cabLicensePlate, vehiculos.marca as carBrand, vehiculos.modelo as carModel, vehiculos.activo as status FROM relaciones
                INNER JOIN vehiculos ON relaciones.id_vehiculo = vehiculos.id_vehiculo
                WHERE id_persona=? AND tipo_persona='titular' AND relaciones.activo='1'   
            `;
                const relaciones = yield conn.query(myQuery_relaciones, [persona[0][0].id_persona]);
                // ERROR: La persona no es due??a de ningun vehiculo
                if (!relaciones[0][0])
                    return response_1.respuesta.error(res, 400, 'Datos incorrectos');
                // El due??o es conductor?
                const myQuery_conductor = `
                SELECT * FROM relaciones
                INNER JOIN vehiculos ON relaciones.id_vehiculo = vehiculos.id_vehiculo
                WHERE id_persona=? AND tipo_persona='chofer' AND relaciones.activo='1'   
            `;
                const conductor = yield conn.query(myQuery_conductor, [persona[0][0].id_persona]);
                // Licencia de conducir
                const myQuery_licencia = `SELECT * FROM licencia WHERE id_persona=? AND activo='1'`;
                const licencia = yield conn.query(myQuery_licencia, [persona[0][0].id_persona]);
                // Arreglos manuales
                let isDriver = 'F';
                // -------------------------------------
                if (conductor[0][0]) {
                    isDriver = 'T';
                }
                else {
                    isDriver = 'F';
                }
                // -------------------------------------
                let cabs = relaciones[0];
                cabs.forEach((elemento) => {
                    elemento.status = 1 ? elemento.status = 'ACTIVE' : elemento.status = 'INACTIVE';
                    elemento.color = 'BLANCO';
                    elemento.licensePlate = elemento.licensePlate.replace('-', '').replace(' ', '');
                });
                // Respuesta de la API
                response_1.respuesta.success(res, {
                    owner: {
                        documentType: persona[0][0].tipo_identificacion,
                        docNumber: persona[0][0].identificacion,
                        isDriver,
                        driverLicense: ((_a = licencia[0][0]) === null || _a === void 0 ? void 0 : _a.nro_licencia) !== undefined ? licencia[0][0].nro_licencia : '',
                        cabs
                    }
                });
            }
            catch (error) {
                console.log(chalk_1.default.red(error));
                response_1.respuesta.error(res, 500);
            }
        });
    }
    // Obtener datos de chofer
    getCabDriver(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { dni, fecha_nacimiento } = req.params;
                // Conexion a la base de datos
                const conn = yield database_1.connect();
                // Datos de persona
                const myQuery_persona = `SELECT * FROM personas WHERE identificacion=? AND fecha_nacimiento=?`;
                const persona = yield conn.query(myQuery_persona, [dni, fecha_nacimiento]);
                // Error: Usuario no encontrado
                if (!persona[0][0])
                    return response_1.respuesta.error(res, 400, 'Datos incorrectos');
                // Tabla relaciones - Es chofer de algun vehiculo?
                const myQuery_relaciones = `
                SELECT * FROM relaciones
                INNER JOIN vehiculos ON relaciones.id_vehiculo = vehiculos.id_vehiculo
                WHERE id_persona=? AND tipo_persona='chofer' AND relaciones.activo='1'   
            `;
                const relaciones = yield conn.query(myQuery_relaciones, [persona[0][0].id_persona]);
                // Error: El usuario no es conductor de ningun vehiculo
                if (!relaciones[0][0])
                    return response_1.respuesta.error(res, 400, 'Datos incorrectos');
                // Licencia de conducir
                const myQuery_licencia = `SELECT * FROM licencia WHERE id_persona=? AND activo='1'`;
                const licencia = yield conn.query(myQuery_licencia, [persona[0][0].id_persona]);
                // Error: No se encontro la licencia de conducir
                if (!licencia[0][0])
                    return response_1.respuesta.error(res, 400, 'Datos incorrectos');
                // Respuesta correcta del sistema
                response_1.respuesta.success(res, { driver: {
                        documentType: persona[0][0].tipo_identificacion,
                        docNumber: persona[0][0].identificacion,
                        driverLicense: licencia[0][0].nro_licencia,
                        status: relaciones[0][0].activo ? 'ACTIVE' : 'INACTIVE'
                    }
                });
            }
            catch (error) {
                console.log(chalk_1.default.red(error));
                response_1.respuesta.error(res, 500);
            }
        });
    }
}
exports.TaxisController = new Taxis();
