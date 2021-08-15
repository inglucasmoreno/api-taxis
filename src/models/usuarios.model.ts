import mongoose, { Schema, model } from 'mongoose';

// Interfaz - Usuario
export interface I_Usuario extends mongoose.Document {
    usuario: String,
    apellido: String,
    nombre: String,
    password: String,
    email: String,
    role: String,
    activo: Boolean
}

// Modelo - Usuario
const usuarioSchema = new Schema({
    
    usuario: {  // Usuario del sistema
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

}, { timestamps: true } );

usuarioSchema.method('toJSON', function(){
    const {__v, _id, password, ...object} = this.toObject<any>();
    object.uid = _id;
    return object;
});

export default model('usuario', usuarioSchema);