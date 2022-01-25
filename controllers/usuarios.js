const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario =  require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const estado = true;

  const [usuarios, total] = await Promise.all([
    Usuario.find({ estado })
      .skip(Number(desde))
      .limit(Number(limite)),
    Usuario.countDocuments({ estado })
  ]);

  res.json({ total, usuarios });
};

const usuariosPost = async(req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  try {
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();
    res.status(201).json({
      msg: 'POST API - usuariosPost',
      usuario
    });  
  } catch (error) {
    console.log(error);
    throw error
  }
}

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  
  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate( id, resto);
  res.json(usuario);
}

const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: 'patch API - usuariosPatch'
  });
};

const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  res.json({
    msg: 'delete API - usuariosDelete',
    usuario
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
}