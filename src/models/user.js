const {Schema, model} =  require ('mongoose');
const bcrypt = require('bcryptjs');
const { Int32 } = require('mongodb');

const userSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: Number, required: true },
    rol: { type: String, required: true, default: 'usuario' },
    correo: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});


userSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt); // devuelve la misma contraseña pero encriptada
};

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

module.exports = model('user', userSchema);