import chalk from 'chalk';
import jwt from 'jsonwebtoken';

// Clase - JsonWebToken
class Jwt {
    public generar(uid: string) {    // Metodo - Generar JsonWebToken
        return new Promise((resolve, reject) => {
            const payload = { uid };
            jwt.sign(payload, process.env.JWT_SECRET || 'EquinoccioKey',{
                expiresIn: '5h'
            }, (err, token) => {
                if(err){
                    console.log(chalk.red(err));
                    reject('No se pudo generar el token');
                }else{
                    resolve(token);    
                }    
            });
        });
    }
}

export const jsonwebtoken = new Jwt();


