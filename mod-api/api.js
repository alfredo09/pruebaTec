//const express = require('express');
//const api = express.Router();
//const db = require('mod-db')
//const config = require('./config')


//let services,
  //Departamento,
  //Empleado

//api.use('*', async (req, res, next) => {
  //if (!services) {
    //debug('Connecting to database')
    //try {
      //services = await db(config.db)
    //} catch (e) {
    //  return next(e)
    //}

    //Departamento = services.Departamento
    //Empleado = services.Empleado
  //}

  //res.header('Access-Control-Allow-Origin', '*')
  //res.header(
   // 'Access-Control-Allow-Headers',
    //'Authorization, X-API-Key, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  //)
  //res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  //res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
  //next()
//})

// Ruta de ejemplo que responde a una solicitud POST

/// DEPARTAMENTO /////////////////////////////////////////////////////////////////////

//api.post('/addDepartamento', async (req, res, next) => {
 // const params = req.body
  //creamos un departamento con todos sus atributos atraves del id del departamento
  //let obj
  //try {
    //obj = await Departamento.create({
      //nombreDepartamento: params.nombreDepartamento,
      //descripcion: params.descripcion,
    //})
  //} catch (e) {
   // return next(e)
  //}
  //res.send(obj)
//})


//module.exports = api;

// Importa las dependencias necesarias
const express = require('express');
const api = express.Router();
const db = require('mod-db');
const config = require('./config');

let services, Departamento, Empleado;

// Middleware para configurar CORS y conectar a la base de datos
api.use(async (req, res, next) => {
  try {
    // Si los servicios no están inicializados, conecta a la base de datos
    if (!services) {
      services = await db(config.db);
      Departamento = services.Departamento;
      Empleado = services.Empleado;
    }

    // Configura los encabezados CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, X-API-Key, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    // Continúa con el siguiente middleware
    next();
  } catch (e) {
    // Manejo de errores al conectar a la base de datos
    console.error('Error al conectar a la base de datos:', e.message);
    return next(e);
  }
});

// Ruta de ejemplo que responde a una solicitud POST
api.post('/saludo', (req, res) => {
  const { nombre } = req.body;
  res.json({ mensaje: `¡Hola, ${nombre || 'desconocido'}!` });
});

// Ruta para agregar un nuevo departamento
api.post('/addDepartamento', async (req, res, next) => {
  const params = req.body;

  try {
    // Crea un nuevo departamento en la base de datos
    const nuevoDepartamento = await Departamento.create({
      nombreDepartamento: params.nombreDepartamento,
      descripcion: params.descripcion,
    });

    // Responde con el objeto del nuevo departamento
    res.status(201).json(nuevoDepartamento);
  } catch (e) {
    // Manejo de errores al crear un nuevo departamento
    console.error('Error al crear un nuevo departamento:', e.message);
    return next(e);
  }
});

module.exports = api;