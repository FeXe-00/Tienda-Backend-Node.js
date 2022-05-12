/**
 *
 * * Express.Router:
 *
 * Crea un controlador(handler) de rutas modulares y montables. Una instancia de Router
 * es un sistema de enrutamiento y middleware completo, por esa razón lo podemos tomar
 * como si fuera una mini app.
 * Cada modulo de nuestras rutas es una mini aplicación en la que creamos sus rutas
 * independientes y podemos incluirle middlewares, que se ejecutarán cuando se coincida
 * con el path.
 *
 */

const express = require('express');
const productsService = require('../services/productService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/productSchema');


const router = express.Router();
//Instanciamos el servicio
const service = new productsService();


//recibimos la lista entera de productos
router.get('/', async (req, res) => {

  const products = await service.find();

  res.json(products);
});


//! LOS ENDPOINTS ESPECÍFICOS(rutas) SE COLOCAN ANTES QUE LOS ENDPOINTS DINÁMICOS
//! debido a que si lo hacemos al revés, nos va a tomar la nueva ruta como si fuese
//! un parámetro, por loq ue esa nueva ruta nunca se crearía.

// *capturamos un parametro id y devolvemos un producto

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);

    } catch (error) {
      // Acá le decimos que ejecute el middleware del tipo
      // error(del errorHandler.js) de forma explícita.
      next(error);
    }
  }
);


//! Para mostrar la información de data tenemos que traer un
//! middleware nativo de express llamado express.json
//! el cual lo iniciamos desde el index principal.

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

//para poder actualizar un atributo con PATCH, si o si tenemos que recibir un atributo
router.patch('/:id',
  //* podemos validar con los middlewares de forma secuencial, enciando uno después del otro
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);

    } catch (err) {
      next(err);
    }
  }
);


router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    // rta = respuesta
    const rta = await service.delete(id);
    res.json(rta);
  }
);

module.exports = router;
