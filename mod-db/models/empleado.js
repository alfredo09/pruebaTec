'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupEmpleadoModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('empleado', {
    nombre: {
      type: Sequelize.STRING,
      allowNull: true
    },
    apPaterno: {
      type: Sequelize.STRING,
      allowNull: true
    },
    apMaterno: {
      type: Sequelize.STRING,
      allowNull: true
    },
    direccion: {
      type: Sequelize.STRING,
      allowNull: true
    },
    telefono: {
      type: Sequelize.STRING,
      allowNull: true
    },
    correo: {
      type: Sequelize.STRING,
      allowNull: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true
    }

  })
}