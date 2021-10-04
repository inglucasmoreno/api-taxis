"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bd_update_controllers_1 = require("../controllers/bd-update.controllers");
const router = express_1.default();
// Actualizar base de datos
router.get('/', bd_update_controllers_1.DbUpdateController.updateDate);
exports.default = router;
