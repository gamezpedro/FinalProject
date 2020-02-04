let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let EstudianteSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    carrera: {
        type: String,
        required: true
    },
    participacion: {
        type: Number,
        required: true
    },
    interes: {
        type: Number,
        required: true
    },
    trabajoenequipo: {
        type: Number,
        required: true
    },
    respeto: {
        type: Number,
        required: true
    },
    asistencia: {
        type: Number,
        required: true
    },
    commentList: {
        type: Array,
    }
})

module.exports = mongoose.model('Estudiante', EstudianteSchema)