module.exports = class {
  findAndCountAll(params) {
    const { Candidate } = global.M

    const { where, curPage = 1, pageSize = 20, ...rest } = params

    return Candidate.findAndCountAll({
      where,
      limit: +pageSize,
      offset: (+curPage - 1) * +pageSize,
      ...rest
    })
  }

  findAll(params) {
    const { Candidate } = global.M

    return Candidate.findAll(params)
  }

  create(params, options = {}) {
    const { Candidate } = global.M

    return Candidate.create(params, options)
  }

  bulkCreate(params, options = {}) {
    const { Candidate } = global.M

    return Candidate.bulkCreate(params, options)
  }

  findOne(params) {
    const { Candidate } = global.M

    return Candidate.findOne(params)
  }

  update(params, options = {}) {
    const { Candidate } = global.M

    return Candidate.update(params, options)
  }

  destroy(params) {
    const { Candidate } = global.M

    return Candidate.destroy(params)
  }
}
