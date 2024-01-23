const express = require('express');
const api = express.Router();

let services,
  Departamento,
  Empleado

api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Connecting to database')
    try {
      services = await db(config.db)
    } catch (e) {
      return next(e)
    }

    Departamento = services.Departamento
    Empleado = services.Empleado
  }

  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-Key, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

// Ruta de ejemplo que responde a una solicitud POST
api.post('/saludo', (req, res) => {
  const { nombre } = req.body;
  res.json({ mensaje: `¡Hola, ${nombre || 'desconocido'}!` });
});

module.exports = api;