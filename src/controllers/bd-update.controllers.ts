import {Request, Response} from 'express';
import { respuesta } from '../helpers/response';
import { connect } from '../database/database';
import { format } from 'date-fns';
import XLSX from 'xlsx';
import chalk from 'chalk';

class DbUpdate {
    
    // Actualizar fecha de nacimiento
    async updateDate(req:Request, res:Response) {
        try{
            
            // Leer listado de excel
            const workbook = XLSX.readFile('./src/public/Personas.xlsx',{ cellDates: true });
            const workbookSheets = workbook.SheetNames;
            const sheet =  workbookSheets[0];
            const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            const db: any[] = dataExcel;

            const conn = await connect();
            const myQuery = "UPDATE personas SET fecha_nacimiento=? WHERE identificacion=?";
            
            // Actualizacion de fechas de nacimiento
            db.forEach( async elemento => {
                if(elemento.FechaNacimiento != undefined) {
                    let fecha = format(new Date(elemento.FechaNacimiento), 'yyyy-MM-dd')
                    await conn.query(myQuery, [fecha, elemento.identificacion]);
                }               
            });

            respuesta.success(res, 'Fecha de nacimiento actualizada');

        }catch(error){
            console.log(chalk.red(error));
        }
    }

}

export const DbUpdateController = new DbUpdate();
