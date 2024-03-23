const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: {
        S: { type: Number, required: true },
        M: { type: Number, required: true },
        L: { type: Number, required: true },
        XL: { type: Number, required: true }
    },
    color: { type: String, required: true },
    genero: { type: String, required: true },
    imagen: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = model('product', productSchema);