const {Schema, model} = require('mongoose')

const NoteSchema = new Schema({    
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {//por cada nota creada se almacena el usuario
        type: String,
        required: false
    } 
}, {
    timestamps: true
})

module.exports = model('note', NoteSchema)