const {Router} = require('express');
const {check} = require('express-validator');
const { getCursos, postCurso, putCurso, deleteCurso, validarMaximo, postAsignarCurso } = require('../controllers/curso');
const { emailExiste, esRoleValido, existeAlumnoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
//const { validarMaximo } = require('../middlewares/validar-registros');
const { tieneRol } = require('../middlewares/validar-role');

const router = Router();

router.get('/mostrar', [
    validarJWT,
    tieneRol('ADMIN_ROLE','PROFE_ROLE', 'ALUMNO_ROLE'),    
],getCursos);

router.post('/agregar', [
    validarJWT,
    tieneRol('ADMIN_ROLE','PROFE_ROLE'),   
    check('nombre', 'El nombre es obligaorio'),
    check('descripcion', 'La descripcion es obligatoria'),
    check('capacidad', 'La capacidad es obligatoria'),
    validarCampos
], postCurso);

router.put('/editar/:id', [
    validarJWT,
    tieneRol('ADMIN_ROLE','PROFE_ROLE'),    
    check('id', 'No es un ID valido de Mongo').isMongoId(),
    check('nombre', 'El nombre es obligaorio'),
    check('descripcion', 'La descripcion es obligatoria'),
    check('capacidad', 'La capacidad es obligatoria'),
    validarCampos
], putCurso);

router.post('/asgnar/:id',[
    validarJWT,
    tieneRol('ADMIN_ROLE','PROFE_ROLE'),    
    check('id', 'No es un ID valido de Mongo').isMongoId(),
    validarCampos
], postAsignarCurso)

router.delete('/eliminar/:id', [
    validarJWT,
    tieneRol('ADMIN_ROLE','PROFE_ROLE'),    
    check('id', 'No es un ID valido de Mongo').isMongoId(),
    validarCampos
],deleteCurso);


module.exports = router;