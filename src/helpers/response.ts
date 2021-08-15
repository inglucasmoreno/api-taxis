import { Response } from 'express';

// Clase respuesta personalizada
class Resp{
    
    // Metodo - Success
    public success(res: Response, msg: any){
        if(typeof(msg) == 'object'){
            res.status(200).json(msg);
        }else{
            res.status(200).json({ msg });
        }    
    }

    // Metodo - Error
    public error(res: Response, status: number, msg: any = "Error de servidor"){
        if(status === 500){
            msg = "Error de servidor";
        };
        if(typeof(msg) == 'object'){
            return res.status(status).json(msg);
        }
        res.status(status).json({ msg });
    }

}

export const respuesta = new Resp();
