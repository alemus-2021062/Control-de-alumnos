const {Router} = require('express');
const { check} = require('express-validator');
const { getAlumnos, postAlumno, putAlumno, deleteAlumno } = require('../controllers/alumno');
const { emailExiste, esRoleValido, existeAlumnoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRol } = require('../middlewares/validar-role');

const router = Router();

router.get('/mostrar', getAlumnos);

router.post('/agregar', [
    validarJWT,
    tieneRol('ADMIN_ROLE'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser igual o mas de 6 digitos').isLength({min:6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos
],postAlumno);

router.put('/editar/:id',[
    validarJWT,
    tieneRol('ALUMNO_ROLE', 'ADMIN_ROLE'),
    check('id', 'No es un ID valido de mongo').isMongoId(),
    check('id').custom(existeAlumnoPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], putAlumno);

router.delete('/eliminar/:id', [
    validarJWT,
    tieneRol('ALUMNO_ROLE','ADMIN_ROLE'),
    check('id', 'Noes un ID valido de Mongo').isMongoId(),
    check('id').custom(existeAlumnoPorId),
    validarCampos
],deleteAlumno);


module.exports = router;