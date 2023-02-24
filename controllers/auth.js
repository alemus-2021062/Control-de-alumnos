const {request, response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req = request, res = response) =>{
    const {correo, password} = req.body;

    try {
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no estan correctos - El correo no existe'
            })
        }

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no estan corresctos - Estado: false '
            })
        }

        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no estan correctos - password incorrecta'
            })
        }

        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'LOGIN ACCESS',
            correo, password,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador (BackEnd)'
        })
    }
}

module.exports = {
    login
}