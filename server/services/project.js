module.exports = class {
  findAndCountAll(params) {
    const { Project } = global.M

    const { where, curPage = 1, pageSize = 20, ...rest } = params

    return Project.findAndCountAll({
      where,
      limit: +pageSize,
      offset: (+curPage - 1) * +pageSize,
      ...rest
    })
  }

  findAll(params) {
    const { Project } = global.M

    return Project.findAll(params)
  }

  create(params, options = {}) {
    const { Project } = global.M

    return Project.create(params, options)
  }

  bulkCreate(params, options = {}) {
    const { Project } = global.M

    return Project.bulkCreate(params, options)
  }

  findOne(params) {
    const { Project } = global.M

    return Project.findOne(params)
  }

  update(params, options = {}) {
    const { Project } = global.M

    return Project.update(params, options)
  }

  destroy(params) {
    const { Project } = global.M

    return Project.destroy(params)
  }
}
