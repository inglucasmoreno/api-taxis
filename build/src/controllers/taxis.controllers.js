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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxisController = void 0;
const response_1 = require("../helpers/response");
const database_1 = require("../database/database");
class Taxis {
    // Se devuelven los datos
    getData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Se obtiene el DNI y la patente
            const { dni, patente } = req.body;
            // Conexion a la base de datos
            const conn = yield database_1.connect();
            // Se traen los datos de la persona    
            const persona = yield conn.query("SELECT * FROM personas WHERE identificacion=? AND activo='1'", [dni]);
            // Existe un usuario habilitado?
            if (!persona[0][0])
                response_1.respuesta.error(res, 404, 'No autorizado');
            // Se traen los datos del vehiculo
            const myQuery = `
            SELECT id_vehiculo, marca, modelo, dominio, motor, chasis, capacidad, nro_ordenanza, colores.descripcion AS 'color', tipo_servicio.descripcion AS 'servicio', tipo_situacion.descripcion AS 'situacion' 
            FROM vehiculos 
            INNER JOIN colores 
            ON colores.id_color=vehiculos.id_color 
            INNER JOIN tipo_servicio
            ON tipo_servicio.id_tipo=vehiculos.id_tipo
            INNER JOIN tipo_situacion
            ON tipo_situacion.id_situacion=vehiculos.situacion
            WHERE dominio=? AND vehiculos.activo='1' AND vehiculos.situacion='1'  
        `;
            const vehiculo = yield conn.query(myQuery, [patente.toUpperCase()]);
            // Existe un vehiculo habilitado?
            if (!vehiculo[0][0])
                response_1.respuesta.error(res, 404, 'No autorizado');
            // Se determina si la persona es chofer y esta autorizada a manejar ese vehiculo
            const autorizado = yield conn.query("SELECT * FROM relaciones WHERE id_vehiculo=? AND id_persona=? AND activo='1'", [vehiculo[0][0].id_vehiculo, persona[0][0].id_persona]);
            if (autorizado[0][0]) {
                const data = {
                    marca: vehiculo[0][0].marca,
                    modelo: vehiculo[0][0].modelo,
                    dominio: vehiculo[0][0].dominio,
                    motor: vehiculo[0][0].motor,
                    chasis: vehiculo[0][0].chasis,
                    capacidad: vehiculo[0][0].capacidad,
                    nro_ordenanza: vehiculo[0][0].nro_ordenanza,
                    color: vehiculo[0][0].color,
                    servicio: vehiculo[0][0].servicio,
                    situacion: vehiculo[0][0].situacion
                };
                response_1.respuesta.success(res, { vehiculo: data });
            }
            else {
                response_1.respuesta.error(res, 404, 'No autorizado');
            }
        });
    }
}
exports.TaxisController = new Taxis();
