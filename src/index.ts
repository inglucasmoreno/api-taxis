/*
    Desarrollador: Equinoccio Technology
    CEO: ing. Lucas Omar Moreno
    Año: 2021
    Tematica: API-REST SiMIV
*/

// Imports
import express from 'express';
import chalk from 'chalk';

// Imports - Rutas
import UsuariosRoutes from './routes/usuarios.routes';
import AuthRoutes from './routes/auth.routes';
import TaxisRoutes from './routes/taxis.routes';
import DbUpdateRoutes from './routes/bd-update.routes';
import helmet from 'helmet';

// [Express]
const app = express();
app.set('PORT', process.env.PORT || 3000);
app.use(require('cors')());
app.use(express.json());
app.use(express.static('src/public')); // Para prod solo 'public'
app.use(helmet());                     // Seguridad

// [Rutas]
app.use('/getToken', AuthRoutes);
app.use('/usuarios', UsuariosRoutes);
app.use('/taxis', TaxisRoutes);
app.use('/db-update', DbUpdateRoutes);

// Ejecución de servidor
app.listen(app.get('PORT'), () => {
    console.log(chalk.blue('[Desarrollador] - ') + 'Equinoccio Technology');
    console.log(chalk.blue('[Express] - ') + `Servidor corriendo en http://localhost:${app.get('PORT')}`)    
});

