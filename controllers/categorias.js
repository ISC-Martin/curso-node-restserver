const { request } = require("express");
const res = require("express/lib/response");
const { Categoria } = require('../models');

const obtenerCategorias = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const estado = true;

  const [categorias, total] = await Promise.all([
    Categoria.find({ estado })
      .skip(Number(desde))
      .limit(Number(limite))
      .populate('usuario', 'nombre'),
    Categoria.countDocuments({ estado })
  ]);

  res.json({ total, categorias });
};

const obtenerCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

  res.json(categoria);
};

const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  
  const categoriaDB = await Categoria.findOne({ nombre });
  if (categoriaDB) {
    return res.status(400).json({
       msg: `La categoria ${categoriaDB.nombre}, ya existe`
    })
  }

  const data = {
    nombre,
    usuario: req.usuario._id
  }

  const categoria = new Categoria(data);
  await categoria.save();
  res.status(201).json(categoria);
};

const actualizarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });
  if (categoriaDB) {
    return res.status(400).json({
       msg: `La categoria ${categoriaDB.nombre}, ya existe`
    })
  }

  const data = {
    nombre,
    usuario: req.usuario._id
  }

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
  res.status(200).json(categoria);
};

const borrarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findByIdAndUpdate(id, { $set: { estado: false } }, { new: true });
    // .populate('usuario', 'correo nombre');
  res.status(200).json(categoria);
};

module.exports = {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria
}