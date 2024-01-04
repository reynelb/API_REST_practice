const boom = require('@hapi/boom');

function validatorHandler(schemaType, property){
  //Callback del middleware
  return (req, res, next) => {
    const info = req[property];//Capturar los datos dinamicamente
    //validador del esquema
    const { error } = schemaType.validate(info, {abortEarly: false});
    if (error){
      next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = validatorHandler;


