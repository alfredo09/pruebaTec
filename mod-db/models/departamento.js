'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupDepartamentoModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('departamento', {
    nombreDepartamento: {
      type: Sequelize.STRING,
      allowNull: true
    },
    descripcion: {
      type: Sequelize.STRING,
      allowNull: true
    },
    switch: {
      type: Sequelize.STRING,
      allowNull: true
    }
  })
}