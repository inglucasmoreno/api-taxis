import chalk from 'chalk';
import mongoose from 'mongoose';

// Clase: Base de datos
class Database {
    public async connection() {    // Metodo: Se establece conexion con la base de datos
        try{
            await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/multicaja',{
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false                 
            })
            console.log(chalk.blue('[MongoDB] - ') + 'Conexion con base de datos -> ' + chalk.green('[Correcta]'));
        }catch(err){
            console.log(chalk.red(err));
            throw new Error('Error al conectar con la base de datos');  
        }            
    }
}

export const db = new Database();
