const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, tieneRole } = require('../middlewares');

const { existeCategoriaPorId } = require('../helpers/db-validators');

const { obtenerCategorias, obtenerCategoria, crearCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');

const router = Router();

// Obtenr una categoria por id - publico
router.get('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
], obtenerCategoria)

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
], crearCategoria);

// Actualizar categoria - privado - cualquier persona con un token válido
router.put('/:id', [
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
], actualizarCategoria);

// Borrar categoria - SOLO ADMIN_ROLE
router.delete('/:id', [
  validarJWT,
  tieneRole('ADMIN_ROLE'),
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
], borrarCategoria);

module.exports = router;