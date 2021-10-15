import Router from 'express';
import { validaciones } from '../middlewares/validations';

import { TaxisController } from '../controllers/taxis.controllers';

// Limitacion de 3 solicitudes por segundo
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({ windowMs: 1000, max: 3 });
const router = Router();

// GetCabDriver
router.get('/getCabDriver/:dni/:fecha_nacimiento', [validaciones.jwt, limiter], TaxisController.getCabDriver);

// GetCabOwner
router.get('/getCabOwner/:dni/:fecha_nacimiento', [validaciones.jwt, limiter] ,TaxisController.getCabOwner);

export default router;


