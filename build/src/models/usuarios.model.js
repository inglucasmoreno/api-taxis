"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Modelo - Usuario
const usuarioSchema = new mongoose_1.Schema({
    usuario: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    apellido: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
    },
    nombre: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        uppercase: true,
        default: 'USER_ROLE'
    },
    activo: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });
usuarioSchema.method('toJSON', function () {
    const _a = this.toObject(), { __v, _id, password } = _a, object = __rest(_a, ["__v", "_id", "password"]);
    object.uid = _id;
    return object;
});
exports.default = mongoose_1.model('usuario', usuarioSchema);
