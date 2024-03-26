//crear archivo 
const express = require('express');
const fs= require('fs')
const nodemailer = require('nodemailer')
const transporter = require('./mailer')
const{ leerArchivo, escribirArchivo } = require('./files')

const app = express();
const morgan = require('morgan');


//settings
//app.set('port',4000)

//mildlewares artículos para el medio
app.use(morgan('dev'));
app.use(express.json());

//routes
app.get('/todos', (req, res) =>{

    //Leer archivo
    const todos = leerArchivo('./src/zapatos.json')
    res.send(todos)
})

//show
app.get('/todos/:identificacion', (req, res)  =>{
    const identificacion = req.params.identificacion
    const todos = leerArchivo('./src/zapatos.json')
    const todo = todos.find(todo => todo.identificacion === parseInt (identificacion))
    //no existe
    if(!todo) {
        res.status(404).send('No existe')
        return
    }
    
    //existe
    res.send(todo)    
    })

    //store
app.post('/todos', (req, res) =>{

    const todo = req.body
    const todos = leerArchivo('./src/zapatos.json')
    todo.identificacion = todos.length + 1
    todos.push(todo)
    //escribir archivo
    escribirArchivo('./src/zapatos.json', todos)
    res.status(201).send(todo)
})

//actualizar 
app.put('/todos/:identificacion', (req, res) => {
    const identificacion = req.params.identificacion;
    const { marca, modelo, color, tamaño, genero, precio, disponibilidad } = req.body;
    let todos = leerArchivo('./src/zapatos.json');
    const todoIndex = todos.findIndex(todo => todo.identificacion === parseInt(identificacion));
    
    // Si no se encuentra, devolver un error 404
    if (todoIndex === -1) {
        res.status(404).send('No existe');
        return;
    }

    // Obtener los zapatos a actualizar
    let todo = todos[todoIndex];

    // Actualizar los campos de los zapatos
    todo = {
        ...todo,
        marca: marca || todo.marca,
        modelo: modelo || todo.modelo,
        color: color || todo.color,
        tamaño: tamaño || todo.tamaño,
        genero: genero || todo.genero,
        precio: precio || todo.precio,
        disponibilidad: disponibilidad || todo.disponibilidad,
    };

    // Actualizar zapats en el index
    todos[todoIndex] = todo;

    // Escribir el archivo actualizado
    escribirArchivo('./src/zapatos.json', todos);

    res.send(todo);
});


//eliminar
app.delete('/todos/:identificacion', (req, res) => {
    const identificacion = req.params.identificacion;
    let todos = leerArchivo('./src/zapatos.json');

    // Buscar el índice de los zapatos a eliminar
    const todoIndex = todos.findIndex(todo => todo.identificacion === parseInt(identificacion));

    // Si no se encuentra el zapato, devolver un error 404
    if (todoIndex === -1) {
        res.status(404).send('No existe');
        return;
    }

    // Eliminar el zapato del arreglo
    todos.splice(todoIndex, 1);

    // Escribir el archivo actualizado
    escribirArchivo('./src/zapatos.json', todos);

    res.send('zapatos eliminados correctamente');
});

//nodemailer 
app.put('/forgot-password', async (req, res) => {
    try {
        await transporter.sendMail({
            from: '"Has olvidado tu contraseña 😁" <yulay.castano39012@ucaldas.edu.co>', // sender address
            to:"yulay.castano39012@ucaldas.edu.co",
            subject: "Has olvidado tu contraseña", // Subject line
            html: "<b>Hello world?</b>", // html body
        });

res.send('Correo de recuperación de contraseña enviado');
    } catch (error) {
        console.error('Error al enviar correo de recuperación de contraseña:', error);
        res.status(500).send('Error al enviar correo de recuperación de contraseña');
    }
});


//empezando el servidor
app.listen (4000, () =>{
    console.log('Server on port 4000');
})