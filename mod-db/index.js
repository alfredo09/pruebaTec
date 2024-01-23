"use strict";

const setupDatabase = require("./lib/db");

const setupEmpleado = require("./lib/empleado");
const setupDepartamento = require("./lib/departamento");

//const defaults = require("defaults");

const setupEmpleadoModel = require("./models/empleado");
const setupDepartamentoModel = require("./models/departamento");

module.exports = async function (config) {
  config = {
    dialect: "sqlite",
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
    },
    query: {
      raw: true,
    },
  };

  const sequelize = setupDatabase(config);

  const EmpleadoModel = setupEmpleadoModel(config);
  const DepartamentoModel = setupDepartamentoModel(config);

  DepartamentoModel.hasMany(EmpleadoModel);
  EmpleadoModel.belongsTo(DepartamentoModel, { onDelete: "CASCADE" });

  await sequelize.authenticate();

  if (config.setup) {
    await sequelize.sync({ force: true });
  }

  const Empleado = setupEmpleado(EmpleadoModel, DepartamentoModel);
  const Departamento = setupDepartamento(DepartamentoModel);

  return {
    Empleado,
    Departamento,
  };
};