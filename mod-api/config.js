'use strict'

module.exports = {
  db: {
    database: process.env.DB_NAME || 'pruebatec',
    username: process.env.DB_USER || 'pruebatec',
    password: process.env.DB_PASS || 'pruebatec',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  },
  auth: {
    secret: process.env.SECRET || 'secret'
  }
}