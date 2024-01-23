'use strict'

module.exports = function setupDepartamento(DepartamentoModel) {

  async function create(obj) {
    const result = await DepartamentoModel.create(obj)
    return result.toJSON()
  }

  async function update(id, obj) {
    const cond = {
      where: {
        id
      }
    }

    const updated = await DepartamentoModel.update(obj, cond)
    return updated
  }

  async function findById(id) {
    return await DepartamentoModel.findOne({
      where: {
        id
      }
    })
  }
  async function findAll() {
    return DepartamentoModel.findAll()
  }
  
  async function findAllQuery(query) {
    return DepartamentoModel.findAll(query)
  }

  async function destroyAll(id) {
    return await DepartamentoModel.destroy({
      where: {
        salaId: id
      }
    })
  }

  async function destroy(id) {
    return await DepartamentoModel.destroy({
      where: {
        id
      }
    })
  }

  async function destroynomDepartamento(nombreDepartamento) {
    return await DepartamentoModel.destroy({
      where: {
        nombreDepartamento
      }
    })
  }
  return {
    create,
    update,
    findById,
    findAll,
    destroyAll,
    findAllQuery,
    destroy,
    destroynomDepartamento
  }
}