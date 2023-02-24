const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Curso = require('../models/curso');

const esRoleValido = async(rol = '') =>{
    const existeRol = await Role.findOne( { rol } );

    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la DB`);
    }
}

const emailExiste = async( correo = '' ) => {

    //Verificamos si el correo ya existe en la DB
    const existeEmail = await Usuario.findOne( { correo } );

    //Si existe (es true) lanzamos excepción
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo } ya existe y esta registrado en la DB`);
    }

}

const existeAlumnoPorId = async(id) => {

    //Verificar si el ID existe
    const existeAlumno = await Usuario.findById(id);

    if ( !existeUser ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}

const existeMaestroPorId = async(id) => {

    //Verificar si el ID existe
    const existeMaestro = await Usuario.findById(id);

    if ( !existeUser ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}

const cursosMaximos = async(id) =>{
    const querry = {alumno:id, estado:true};
    const alumnosMax = await Curso.countDocuments(querry)
    return alumnosMax
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeAlumnoPorId,
    existeMaestroPorId,
    cursosMaximos
}