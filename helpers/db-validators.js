const { Categoria } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const isRoleValid = async (rol = '') => {
  const existeRol = await Role.findOne({role: rol });
  if (!existeRol) {
    throw new Error(`El rol -${rol}- no es válido.`);
  }
}

const emailExiste = async (correo = '') => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo -${correo}- ya existe.`);
  }
}

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El usuario con id-${JSON.stringify(id)}- no existe.`);
  }
} 

const existeCategoriaPorId = async (id) => {
  const existe = await Categoria.findById(id);
  if (!existe) {
    throw new Error(`La categoria con id-${JSON.stringify(id)}- no existe.`);
  }
}

const existeCategoriaPorNombre = async (nombre) => {
  const existe = await Categoria.findOne(nombre);
  if (!existe) {
    throw new Error(`La categoria con nombre-${JSON.stringify(nombre)}- ya existe.`);
  }
}

module.exports = {
  isRoleValid,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeCategoriaPorNombre
}