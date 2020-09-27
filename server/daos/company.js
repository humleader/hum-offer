const CompanyService = require('services/company')
const companyService = new CompanyService()
module.exports = class {
  async findAndCountAll(params) {
    const { where, pageIndex = 1, pageSize = 20, ...rest } = params

    const { count, rows } = await companyService.findAndCountAll({
      where,
      limit: +pageSize,
      offset: (+pageIndex - 1) * +pageSize,
      order: [['updateTime', 'DESC']],
      ...rest
    })
    return {
      pageIndex: +pageIndex,
      pageSize: +pageSize,
      total: count,
      list: rows || []
    }
  }

  findAll(params) {
    return companyService.findAll(params)
  }

  create(params, options = {}) {
    return companyService.create(params, options)
  }

  update(params, options = {}) {
    return companyService.update(params, options)
  }

  findOne(id) {
    const { OperationLog } = global.M
    return companyService.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: OperationLog,
          as: 'OperationLog',
          required: false
        }
      ],
      order: [[OperationLog, 'createTime', 'DESC']]
    })
  }

  async getCompanyToProject() {
    const { Company } = global.M

    return Company.findAll({
      where: {
        type: 2
      },
      order: [['updateTime', 'DESC']]
    })
  }

  async SaveCompany(ctx) {
    const params = ctx.request.body
    const { Company, OperationLog, sequelize } = global.M
    let data = {}
    return sequelize
      .transaction(async t => {
        if (params.id) {
          await Company.update(
            {
              ...params,
              lastUpdateUserId: ctx.session.user.id
            },
            { where: { id: params.id }, transaction: t }
          )
        } else {
          data = await Company.create(
            {
              ...params,
              addUserId: ctx.session.user.id
            },
            {
              transaction: t
            }
          )
        }
        if (params.comment) {
          const logparams = {
            companyId: data.id || params.id,
            lastUpdateUserId: ctx.session.user.id,
            comment: params.comment
          }
          await OperationLog.create(
            {
              ...logparams
            },
            {
              transaction: t
            }
          )
        }
      })
      .then(res => res)
  }

  async filterNameCompany(companyName) {
    const { Company } = global.M
    return Company.findAll({
      where: {
        companyName
      }
    })
  }
}
