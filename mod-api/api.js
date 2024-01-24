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

/// DEPARTAMENTO /////////////////////////////////////////////////////////////////////

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
  //buscamos y devolvemos a todos los departamentos
  const obj = await Departamento.findAll()
  res.send(obj)
})

api.post('/getEmpleadosPorDepartamento', async (req, res, next) => {
  var params = req.body;
  // Obtenemos todos los empleados
  const empleadosTodos = await Empleado.findAll();
  // Creamos un vector vacío
  var empleadosDepartamento = [];
  //console.log('Empleados Todos:', empleadosTodos);
  // Iteramos a todos los empleados y preguntamos si el departamento de un empleado es igual al que le mandamos por postman
  // Si es así, guardamos el empleado y lo devolvemos
  empleadosTodos.forEach((empleado) => {
     if (empleado.departamentoId == params.departamentoId) {
      empleadosDepartamento.push({
        id: `${empleado.id}`,
        nombre: `${empleado.nombre}`,
        apPaterno: `${empleado.apPaterno}`,
        apMaterno: `${empleado.apMaterno}`,
        telefono: `${empleado.telefono}`,
        correo: `${empleado.correo}`,
        departamentoId: `${empleado.departamentoId}`,
      });
    }
  });

  res.send(empleadosDepartamento);
});

api.delete('/deleteDepartamento', async (req, res, next) => {
  const params = req.body
  //borro una departamento apartir del id de departamento
  await Departamento.destroy(params.id)
  res.send({ message: 'se borro el departamento' })
})

 /// EMPLEADO /////////////////////////////////////////////////////////////////////
  
 api.post('/addEmpleado', async (req, res, next) => {
  const params = req.body
  //creamos un empleado con todos sus atributos atraves del id de el departamento
  let obj
  try {
    obj = await Empleado.create(params.departamentoId, {
      nombre: params.nombre,
      apPaterno: params.apPaterno,
      apMaterno: params.apMaterno,
      direccion: params.direccion,
      telefono: params.telefono,
      correo: params.correo,
      password: params.password,
    })
  } catch (e) {
    return next(e)
  }
  res.send(obj)
})

api.put('/updateEmpleado', async (req, res, next) => {
  const params = req.body
  //editamos un empleado atraves de su id
  let obj
  try {
    obj = await Empleado.update(params.id, {
      nombre: params.nombre,
      apPaterno: params.apPaterno,
      apMaterno: params.apMaterno,
      direccion: params.direccion,
      telefono: params.telefono,
      correo: params.correo,
      password: params.password,
    })
  } catch (e) {
    return next(e)
  }
  res.send(obj)
})

api.post('/findByIdEmpleado', async (req, res, next) => {
  const params = req.body
  //buscamos al empleado atraves de su id y lo devolvemos
  let obj
  try {
    obj = await Empleado.findById(params.id)
  } catch (e) {
    return next(e)
  }
  if (!obj || obj.lenght == 0) {
    return next(new Error(`Empleado not found with id ${params.id}`))
  }
  res.send(obj)
})

api.get('/findAllEmpleado', async (req, res, next) => {
  let obj
  //buscamos y devolvemos a todos los empleados
  try {
    obj = await Empleado.findAll()
  } catch (e) {
    return next(e)
  }
  res.send(obj)
})

api.delete('/deleteEmpleado', async (req, res, next) => {
  const params = req.body
  //borro un empleado apartir del id de empleado
  await Empleado.destroy(params.id)
  res.send({ message: 'se borro al empleado' })
})


module.exports = api;