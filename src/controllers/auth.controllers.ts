import { Request, Response } from 'express';
import chalk from 'chalk';

import { connect } from '../database/database';

import { respuesta } from '../helpers/response';
import { jsonwebtoken } from '../helpers/jwt';

class Auth {
    
    // Metodo: Login de usuario
    public async login(req: Request, res: Response) {
        try{

            const {userName, password} = req.body;
    
            const conn = await connect();

            // Se verifica si el usuario y contraseña son correctos
            const usuarioDB: any = await conn.query('SELECT * FROM login WHERE usuario = ? AND password = ?',[userName, password]);
            if(usuarioDB[0].length == 0) return respuesta.error(res, 400, 'Los datos son incorrectos');
                        
            // Se verifica si el usuario esta activo
                        
            // Se genera el token
            const token = await jsonwebtoken.generar(usuarioDB[0][0].id);
    
            respuesta.success(res, { token });
    
        }catch(err){
            console.log(chalk.red(err));
            respuesta.error(res, 500);
        }        
    }

}

export const AuthController = new Auth;
