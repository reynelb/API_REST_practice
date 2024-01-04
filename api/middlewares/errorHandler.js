const express = require('express');
const boom = require('@hapi/boom');

function logErrors (error, req, res, next) {
  console.error();
  console.log('LogErrors')
  next(error);
}

function errorHandler (error, req, res, next){
  res.status(500).json({
    error: error.message,
    stack: error.stack
  });
}

function boomErrorHandler (error, req, res, next) {
  //Chequeamos que el error sea boom, el cual se indica en las propiedad del json
  if (error.isBoom){
    const { output } = error;
    return res.status(output.statusCode).json(output.payload);
  }
  //Sino pues se pasa al siguiente middleware encargado de manejar los errores
  next(error);
}


module.exports = {logErrors, errorHandler, boomErrorHandler}
