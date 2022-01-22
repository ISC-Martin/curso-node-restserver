const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';

    // Middlewares
    this.middlewares();
    // Rutas de mi aplicacin
    this.routes();
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/users'));
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