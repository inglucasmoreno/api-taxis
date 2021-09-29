import Router from 'express';
import { check } from 'express-validator';
import { validaciones } from '../middlewares/validations';

import { TaxisController } from '../controllers/taxis.controllers';

const router = Router();

// Datos
// router.post('/data',validaciones.jwt ,TaxisController.getData);

// GetCabDriver
router.get('/getCabDriver/:dni', [validaciones.jwt], TaxisController.getCabDriver);

// GetCabOwner
router.get('/getCabOwner/:dni', [validaciones.jwt] ,TaxisController.getCabOwner);

export default router;


