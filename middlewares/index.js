const validaCampos = require('./validar-campos');
const validarJWT = require('./validar-jwt');
const validarRoles = require('./validar-roles');

module.exports = {
  ...validaCampos,
  ...validarJWT,
  ...validarRoles
}