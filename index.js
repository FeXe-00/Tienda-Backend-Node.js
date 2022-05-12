/*

REST: Representational State Transfer
Es una conveccion que se refiere a servicios web por protocolo HTTP

* req y res:
req es un objeto que contiene información sobre la solicitud HTTP que
provocó el evento. En respuesta a req, usa res para devolver la respuesta
HTTP deseada.

* Más info:
https://www.codecademy.com/article/what-is-rest
https://expressjs.com/en/guide/routing.html

Metodos:

    Get: Obtener
    Put: Modificar/Actualizar todos los atributos(segun la convención REST)
    Patch: Modificar/Actualizar atributos específicos(segun la convención REST)
    Post: Crear
    Delete: Eliminar

    https://www.redhat.com/es/topics/api/what-is-a-rest-api

*/

const express = require('express');
const routerApi = require('./routes') //no hace falta colocar el archivo ya que busca el que se llama index por defecto
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler')
const cors = require('cors');

const app = express();


const port = process.env.PORT || 3000;

//* para poder recibir los datos en el formato json
app.use(express.json());

// ********************* CORS *********************

//! si habilitamos cors sin pasarle argumentos,
//! habilitamos a a cualquier dominio/origen,
//! y si no lo habilitamos por defecto sólo habilita
//! nuestro propio origen

//* esta lista va a contener a los origenes de
//* los cuales si quiero recibir peticiones
const whiteList = ['http://127.0.0.1:5500'];

const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      // el argumento null es para decir que no hay error,
      // y true para decir que el dominio está permitido
      callback(null, true);
    } else {
      callback(new Error('No Permitido! '));
    }
  }
}

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hola este es mi servidor en express!')
});

app.get('/new-route', (req, res) => {
  res.send('Hello i am a new route!')
});

routerApi(app); //! llamamos al router con la aplicación

// el orden en el que los colocamos importa,
// ya que se van a ejecutar de manera secuencial
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);



app.listen(port, () => {
  console.log("http://localhost:3000")
});
