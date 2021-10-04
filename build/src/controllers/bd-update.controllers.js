"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbUpdateController = void 0;
const response_1 = require("../helpers/response");
const database_1 = require("../database/database");
const date_fns_1 = require("date-fns");
const xlsx_1 = __importDefault(require("xlsx"));
const chalk_1 = __importDefault(require("chalk"));
class DbUpdate {
    // Actualizar fecha de nacimiento
    updateDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Leer listado de excel
                const workbook = xlsx_1.default.readFile('./src/public/Personas.xlsx', { cellDates: true });
                const workbookSheets = workbook.SheetNames;
                const sheet = workbookSheets[0];
                const dataExcel = xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheet]);
                const db = dataExcel;
                const conn = yield database_1.connect();
                const myQuery = "UPDATE personas SET fecha_nacimiento=? WHERE identificacion=?";
                // Actualizacion de fechas de nacimiento
                db.forEach((elemento) => __awaiter(this, void 0, void 0, function* () {
                    if (elemento.FechaNacimiento != undefined) {
                        let fecha = date_fns_1.format(new Date(elemento.FechaNacimiento), 'yyyy-MM-dd');
                        yield conn.query(myQuery, [fecha, elemento.identificacion]);
                    }
                }));
                response_1.respuesta.success(res, 'Fecha de nacimiento actualizada');
            }
            catch (error) {
                console.log(chalk_1.default.red(error));
            }
        });
    }
}
exports.DbUpdateController = new DbUpdate();
