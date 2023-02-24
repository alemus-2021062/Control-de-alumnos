const {response, request} = require('express');
const Curso = require('../models/curso');
const {cursosMaximos} = require('../helpers/db-validators');
const Usuario = require('../models/usuario')

const getCursos = async(req = request, res = response) =>{
    const querry = {estado:true};
    const listaCurso = await Promise.all([
        Curso.countDocuments(querry),
        Curso.find(querry).populate('maestro', 'nombre')
        .populate('alumno', 'correo')
    ])
    res.json({
        msg: 'GET Curso',
        listaCurso
    })
}

const cursoMax = [];

const postCurso = async(req = request, res = response) =>{
    const {nombre, descripcion, capacidad, maestro, alumno} = req.body;
    const cursoGuardarDB = new Curso({nombre, descripcion, capacidad,maestro,alumno});
    
    // if (alumno.length < 2) {
    //     res.status(401).json({
    //         msg: 'Ya alcanzaste la maxima capacidad de cursos',
    //         cursoGuardarDB
    //     })
        
    // }else{
    //     console.log('Agregando curso')
    //     await cursoGuardarDB.save();
    // }
    await cursoGuardarDB.save();

    res.json({
        msg: 'POST Curso',
        cursoGuardarDB
    })
}

const postAsignarCurso = async(req = request, res = response) =>{
    const {id} = req.params;
    const {_id, ...resto} = req.body;

    const cursoEditar = await Curso.findByIdAndUpdate(id, resto);

    if (cursosMaximos(req.usuario._id.toString()) > 3) {
        res.status(401).json({
            msg: 'Ya no te puedes asignar a mas cursos'
        })
    }

    res.json({
        msg: 'PUT Curso',
        cursoEditar
    })
}

const putCurso = async(req = request, res = response) =>{
    const {id} = req.params;
    const {_id, ...resto} = req.body;

    const cursoEditar = await Curso.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT Curso',
        cursoEditar
    })
}

const deleteCurso = async(req = request, res = response) =>{
    const {id} = req.params;
    const cursoDelete = await Curso.findByIdAndDelete(id);
    res.json({
        msg: 'DELETE Curso',
        cursoDelete
    })
}

module.exports = {
    getCursos,
    postCurso,
    putCurso,
    deleteCurso,
    postAsignarCurso
}