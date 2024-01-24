"use strict";

module.exports = function setupEmpleado(EmpleadoModel, DepartamentoModel) {
  async function create(id, obj) {
    const res = await DepartamentoModel.findOne({
      where: {
        id,
      },
    });

    if (res) {
      Object.assign(obj, { departamentoId: res.id });
      const result = await EmpleadoModel.create(obj);
      return result.toJSON();
    }
  }

  async function update(id, obj) {
    const cond = {
      where: {
        id,
      },
    };

    const updated = await EmpleadoModel.update(obj, cond);
    return updated;
  }

  async function findById(id) {
    return await EmpleadoModel.findOne({
      where: {
        id,
      },
    });
  }
  async function findAll() {
    return EmpleadoModel.findAll();
  }

  async function findAllOrder() {
    return EmpleadoModel.findAll({
      order: [["nombre", "ASC"]],
    });
  }

  async function findOneCorreo(obj) {
    return await EmpleadoModel.findOne({
      where: {
        correo: obj,
      },
    });
  }

  async function destroyAll(id) {
    return await EmpleadoModel.destroy({
      where: {
        salaId: id,
      },
    });
  }

  async function destroy(id) {
    return await EmpleadoModel.destroy({
      where: {
        id,
      },
    });
  }
  return {
    create,
    update,
    findById,
    findAllOrder,
    findAll,
    findOneCorreo,
    destroyAll,
    destroy,
  };
};