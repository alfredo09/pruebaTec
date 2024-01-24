// Importa las dependencias necesarias
const express = require('express');
const api = express.Router();
const db = require('mod-db');
const config = require('./config');
const cors = require('cors');
api.use(cors());
const bodyParser = require('body-parser');
api.use(bodyParser.json());

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

api.put('/updateDepartamento', async (req, res, next) => {
  const params = req.body
  //editamos un departamento atraves de su id
  let obj
  try {
    obj = await Departamento.update({
      nombreDepartamento: params.nombreDepartamento,
      descripcion: params.descripcion,
    })
  } catch (e) {
    return next(e)
  }
  res.send(obj)
})

api.post('/findByIdDepartamento', async (req, res, next) => {
  const params = req.body
  //buscamos un departamento por su id y devolvemos ese departamento
  let obj
  try {
    obj = await Departamento.findById(params.id)
  } catch (e) {
    return next(e)
  }
  if (!obj || obj.lenght == 0) {
    return next(new Error(`Departamento not found with id ${params.id}`))
  }

  res.send(obj)
})

api.get('/findAllDepartamento', async (req, res, next) => {
  //buscamos y devolvemos a todas las salas
  const obj = await Departamento.findAll()
  res.send(obj)
})

api.post('/getEmpleadosPorDepartamento', async (req, res, next) => {
  var params = req.body
  //obtenemos todos los empleados
  const empleadosTodos = await Empleado.findAll()
  //creamos un vector vacio
  var empleadosDepartamento = []
  //iteramos a todos los empleados y preguntamos si el departamento de un empleado es igual a la q le mandamos por postman
  //si es asi guardamos el empleado y lo devolvemos
  empleadosTodos.forEach((empleado) => {
      if (
        empleado.departamentoId == params.departamentoId &&
        empleado.id == obj.empleadoId &&
        obj.allow != null
      ) {
        empleadosDepartamento.push({
          id: `${empleado.id}`,
          nombre: `${empleado.nombre}`,
          apPaterno: `${empleado.apPaterno}`,
          apMaterno: `${empleado.apMaterno}`,
          telefono: `${empleado.telefono}`,
          correo: `${empleado.correo}`,
          salaId: `${empleado.salaId}`,
        })
      }
  })

  res.send(empleadosDepartamento)
})

api.delete('/deleteDepartamento', async (req, res, next) => {
  const params = req.body
  //borro una departamento apartir del id de departamento
  await Departamento.destroy(params.id)
  res.send({ message: 'se borro el departamento' })
})

module.exports = api;