import {Request, Response} from 'express';

import { respuesta } from '../helpers/response';
import { connect } from '../database/database';

class Taxis {
    
    // Se devuelven los datos
    async getData(req: Request, res: Response) {

        // Se obtiene el DNI y la patente
        const { dni, patente } = req.body;        
        
        // Conexion a la base de datos
        const conn = await connect();
    
        // Se traen los datos de la persona    
        const persona: any = await conn.query("SELECT * FROM personas WHERE identificacion=?",[dni]);
        
        // Existe un usuario habilitado?
        if(!persona[0][0]) respuesta.error(res, 404, 'No autorizado');
        
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
        `
        const vehiculo: any = await conn.query(myQuery, [patente.toUpperCase()]);

        // Existe un vehiculo habilitado?
        if(!vehiculo[0][0]) respuesta.error(res, 404, 'No autorizado');

        // Se determina si la persona es chofer y esta autorizada a manejar ese vehiculo
        const autorizado: any = await conn.query("SELECT * FROM relaciones WHERE id_vehiculo=? AND id_persona=? AND activo='1'",[vehiculo[0][0].id_vehiculo,persona[0][0].id_persona]);

        if(autorizado[0][0]){
            const data = {
                marca: vehiculo[0][0].marca,
                modelo: vehiculo[0][0].modelo,
                patente: vehiculo[0][0].dominio,
                color: vehiculo[0][0].color,
            }
            respuesta.success(res, {vehiculo: data});
        }else{
            respuesta.error(res, 404, 'No autorizado');
        }
    }
}

export const TaxisController = new Taxis();
