/**
 *
 * Información y teoría sobre los middlewares en el archivo infoImportante.txt
 *
 */

function logErrors(err, req, res, next) {
  console.log('LogErrors');
  console.error(err);
  //le enviamos el error a otro middleware a través de next()
  next(err);
}

//Este middleware devuelve el error en un formato
function errorHandler(err, req, res, next) {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
  //Si o si hay que utilizar next para que detecte que es un middleware
  //del tipo error, pero se hacen después de definir el routing(archivo index.js o servidor)

}

// Middleware para manejar los errores con el módulo boom.
function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload)
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
