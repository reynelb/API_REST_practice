const express = require('express');
const userRouter = require('./userRoute')

function routerApi(app) {

  //Asignamos router al metodo Router de express, para especificar la direccion
  const router = express.Router();
  app.use('/api/v1', router);

  //Aqui ire agregando cada nuevo modulo que vaya creando del sistema
  router.use('/users', userRouter);
}

module.exports = routerApi;
