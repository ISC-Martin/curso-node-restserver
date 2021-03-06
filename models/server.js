const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      usuarios: '/api/users',
      categorias: '/api/categorias'
    }

    // Conectar a la BD
    this.conectarDB();

    // Middlewares
    this.middlewares();
    
    // Rutas de mi aplicacin
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.usuarios, require('../routes/usuarios'));
    this.app.use(this.paths.categorias, require('../routes/categorias'));
  }

  start() {
    this.app.listen(this.port, () => {
      console.log('SERVER ON:', this.port);
    });
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y Parseo del body
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static('public'));
  }
}

module.exports = Server;