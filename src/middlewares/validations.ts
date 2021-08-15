import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import { validationResult } from 'express-validator';

import jwt from 'jsonwebtoken';
import { respuesta } from '../helpers/response';


class Validations {

    // Metodo: Validacion de campos    
    public campos(req: Request, res: Response, next: NextFunction) {          
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            return respuesta.error(res, 400, {
                errors: errores.mapped() // Podria ser tambien -> array()
            });
        }
        next();       
    }
              
    // Metodo: Validacion de JWT
    public jwt(req: any, res: Response, next: NextFunction) {
        try{
        
            // ¿Viene x-token en cabecera?
            const token: any = req.header('x-token');
            if(!token) return respuesta.error(res, 401, 'No hay token en la peticion');
    
            // Se extrae el uid (ID de usuario del token) y se agrega en la peticion
            const data: any = jwt.verify(token, process.env.JWT_SECRET || 'EquinoccioKey');
            req.uid = data.uid;
            
            // Se continua hacia el controlador correspondiente
            next(); 
       
        }catch(err){
            console.log(chalk.red(err));
            respuesta.error(res, 500);
        } 
    }

}

export const validaciones = new Validations();