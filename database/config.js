const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('DB conexion exitosa');
  } catch (error) {
    console.log(error);
    throw new Error('Error conexion a la DB');
  }
}

module.exports = {
  dbConnection
};