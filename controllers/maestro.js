const {request, response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const getMaestros = async(req = request, res = response) =>{
    const querry = {estado:true, rol:'PROFE_ROLE'};
    const listaMaestro = await Promise.all([
        Usuario.countDocuments(querry),
        Usuario.find(querry)
    ])
    res.json({
        msg: 'GET Maestro',
        listaMaestro
    })
}

const postMaestro = async(req = request, res = response) =>{
    const {nombre, correo, password, rol} = req.body;
    const maestroGuardadoDB = new Usuario({nombre, correo, password, rol});
    const salt = bcrypt.genSaltSync();
    maestroGuardadoDB.password = bcrypt.hashSync(password,salt);
    
    await maestroGuardadoDB.save();

    res.json({
        msg: 'POST Maestro',
        maestroGuardadoDB
    })

}

const putMaestro = async(req = request, res = response) =>{
    const {id} = req.params;
    const { _id, ...resto} = req.body;

    if (resto.password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    const maestroEditado = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT Alumnos',
        maestroEditado
    })
}

const deleteMaestro = async(req = request, res = response) =>{
    const {id} = req.params;
    const maestroEliminado = await Usuario.findByIdAndDelete(id);
    res.json({
        msg: 'DELETE Maestro',
        maestroEliminado
    })
}

module.exports = {
    getMaestros,
    postMaestro,
    putMaestro,
    deleteMaestro
}