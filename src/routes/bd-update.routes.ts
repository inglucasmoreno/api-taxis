import Router from 'express';
import { check } from 'express-validator';
import { validaciones } from '../middlewares/validations';

import { DbUpdateController } from '../controllers/bd-update.controllers';

const router = Router();

// Actualizar base de datos
router.get('/', DbUpdateController.updateDate);

export default router;