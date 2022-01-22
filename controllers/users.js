const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
  const query = req.query;
  res.json({
    msg: 'get API - usuariosGet',
    query
  });
};

const usuariosPost = (req = request, res = response) => {
  const { nombre, edad } = req.body;
  res.status(400).json({
    msg: 'put API - usuariosPost',
    nombre,
    edad
  });
}

const usuariosPut = (req = request, res = response) => {
  const id = req.params.id;
  res.status(400).json({
    msg: 'put API - usuariosPut',
    id,
  });
}
const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: 'patch API - usuariosPatch'
  });
};

const usuariosDelete = (req = request, res = response) => {
  res.json({
    msg: 'delete API - usuariosDelete'
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
}