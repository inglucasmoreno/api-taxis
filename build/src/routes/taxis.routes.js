"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taxis_controllers_1 = require("../controllers/taxis.controllers");
const router = express_1.default();
// Datos
router.post('/data', taxis_controllers_1.TaxisController.getData);
exports.default = router;
