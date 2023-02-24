const {Schema, model} = require('mongoose');

const cursoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    capacidad:{
        type: Number,
        required: [true, 'La capacidad es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    },
    maestro:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true
    },
    alumno: [{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }]
})

module.exports = model('curso', cursoSchema )