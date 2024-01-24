'use strict'

const Sequelize = require('sequelize')
let sequelize = null

module.exports = function setupDatabase (config) {
  //if (!sequelize) {
  //  sequelize = new Sequelize(config)
  //}
  if (!sequelize) {
    sequelize = new Sequelize(config.database, config.username, config.password, {
      host: config.host,
      dialect: config.dialect,
      pool: config.pool,
      query: config.query,
    });
  }
  return sequelize
}