const {request, response} = require('express');
const curso = require('../models/curso');
const Curso = require('../models/curso');
const Usuario = require('../models/usuario');

const cursosRepetidos = [];
const cursoMax = [];

const validarRepeticion = (res = response, req = request, next) =>{

}

const validarMaximo = (res = response, req = request, next) =>{
    if (cursoMax.length > 3) {
        res.status(401).json({
            msg: 'Ya alcanzaste la maxima capacidad de cursos'
        })
    }else{
        cursoMax.push(res);
        console.log('Agregando curso')
        next();
    }

   
}

module.exports = {
    validarRepeticion,
    validarMaximo
}