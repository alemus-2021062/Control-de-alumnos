const { request, response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario  = require('../models/usuario');

const getAlumnos = async(req = request, res = response) =>{
    const querry = {estado:true, rol:'ALUMNO_ROLE'};
    const listaAlumno = await Promise.all([
        Usuario.countDocuments(querry),
        Usuario.find(querry)
    ])
    res.json({
        msg: 'GET Alumno',
        listaAlumno
    })
}

const postAlumno = async(req = request, res = response) => {
    const {nombre, correo, password, rol,} = req.body;
    const alumnoGuardadoDB = new Usuario({nombre, correo, password, rol});

    const salt = bcrypt.genSaltSync();
    alumnoGuardadoDB.password = bcrypt.hashSync(password, salt);

    await alumnoGuardadoDB.save();

    res.json({
        msg: 'POST Alumno',
        alumnoGuardadoDB
    })
}

const putAlumno = async(req = request, res = response) =>{
    const {id} = req.params;
    const {_id, ...resto} = req.body;

    if (resto.password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    const alumnoEditado = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT Alumnos',
        alumnoEditado
    })

}

const deleteAlumno  = async(req = request, res = response) =>{
    const {id} = req.params;
    const alumnoDelete = await Usuario.findByIdAndDelete(id);
    res.json({
        msg: 'DELETE Alumno',
        alumnoDelete
    })
}

module.exports = {
    getAlumnos,
    postAlumno,
    putAlumno,
    deleteAlumno
}