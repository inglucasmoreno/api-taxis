import Router from 'express';
import { check } from 'express-validator';
import { validaciones } from '../middlewares/validations';

import { TaxisController } from '../controllers/taxis.controllers';

const router = Router();

// Listar
router.post('/getDrivers', TaxisController.getDrivers);
router.post('/', TaxisController.createPosts);

export default router;


