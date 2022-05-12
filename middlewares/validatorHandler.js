//! el argumento abortEarly en false nos permite mostrar todos los
//! errores que haya tenido el usuario en el proceso de validación,
//! en vez de mostrar el primer error que se se encuentra.

const boom = require('@hapi/boom');
//* este middleware no usa error first porque no maneja errores

function validatorHandler(schema, property) {
  //* creamos un middleware de forma dinámica con closers
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
