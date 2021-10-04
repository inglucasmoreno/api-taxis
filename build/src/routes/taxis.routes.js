"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validations_1 = require("../middlewares/validations");
const taxis_controllers_1 = require("../controllers/taxis.controllers");
const router = express_1.default();
// Datos
// router.post('/data',validaciones.jwt ,TaxisController.getData);
// GetCabDriver
router.get('/getCabDriver/:dni/:fecha_nacimiento', [validations_1.validaciones.jwt], taxis_controllers_1.TaxisController.getCabDriver);
// GetCabOwner
router.get('/getCabOwner/:dni/:fecha_nacimiento', [validations_1.validaciones.jwt], taxis_controllers_1.TaxisController.getCabOwner);
exports.default = router;
