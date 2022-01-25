const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';
    this.authPath = '/api/auth';

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
    this.app.use(this.authPath, require('../routes/auth'));
    this.app.use(this.usersPath, require('../routes/usuarios'));
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