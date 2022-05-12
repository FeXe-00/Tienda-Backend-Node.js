/* 

REST: Representational State Transfer
Es una conveccion que se refiere a servicios web por protocolo HTTP

Metodos:

    Get: Obtener
    Put: Modificar/Actualizar
    Patch: Modificar/Actualizar
    Post: Crear
    Delete: Eliminar 

    https://www.redhat.com/es/topics/api/what-is-a-rest-api

*/
const faker= require('faker');
const express = require('express');
const app = express();

const port = 5000; // the OS provides a port to communicate with the router and use the http methods

/* ROUTING */ // the routs are the diferent sections/parts of a website.

// This is the default rout
app.get('/', (req, res) => {
    res.send("Hello Server!");
});

app.get('/test', (req, res) => {
    res.json({
        message: 'Hello Test!'
    });
});

app.get('/products', (req, res) => {
    res.json([
        {
            name: 'product 1',
            price: 5000
        },
        {
            name: 'product 2',
            price: 2000
        }
    ]);
});


// :id is a parameter passed by url/end-point
app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    
    res.json([
        {
            id,
            name: 'product 2',
            price: 2000
        }
    ]);
});

// Example of multiple parameters passed by url/end-point
app.get('/categories/:categoryId/products/:productId', (req, res) => {
    const { categoryId, productId } = req.params;
    
    res.json({
        categoryId,
        productId,
    });
});



app.get('/users', (req, res) => {
    const { limit, offset } = req.query;

    if (limit && offset) {
        res.send({
            limit,
            offset
        });
    } else {
        res.send('No hay parametros!');
    }
});


app.get('/merch', (req, res) => {
    const merch = [];
    
    // Faker module implementation to simulate a database
    for (let i = 0; i < 100; i++) {
        merch.push({
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.productName()),
            Image: faker.image.imageUrl()
        });
        
    }

    res.json(merch);
});




app.listen(port, () => {
    console.log("http://localhost:" + port);
});
