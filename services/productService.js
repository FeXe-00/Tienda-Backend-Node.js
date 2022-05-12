const faker = require('faker');

// Utilizamos este módulo para manejar
// los statusCodes de una manera correcta y más cómoda
const boom = require('@hapi/boom');

class productsService {
  constructor() {
    //vamos a guardar los productos en memoria a través de un array,
    //simulando la base de datos
    this.products = [];
    //genera los 100 productos cada vez que realicemos una instancia del prototipo
    this.generate();
  }

  async generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    //En este caso vamos a emular una demora con una promesa y setTimeout
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 1000)
    });
  }

  async findOne(id) {
    //! con esta operación errónea probamos los middlewares del errorHandler
    /* const num = z + 1 */


    // el find() que usamos es un metodo del prototipo Object y
    // no el que creamos en esta clase
    const product = this.products.find(item => item.id == id);
    if (!product) {
      throw boom.notFound('Product Not Found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product Is Blocked');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id == id);
    if (index === -1) {
      throw boom.notFound('Product Not Found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    }
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id == id);
    if (index === -1) {
      throw boom.notFound('Product Not Found');
    }

    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = productsService;
