const ProjectService = require('services/project')
const projectService = new ProjectService()
module.exports = class {
  // 获取用户列表
  async getProjectList(query, filter) {
    const { Project, ProCanAss } = global.M
    const { pageIndex = 1, pageSize = 20 } = query
    const offset = (pageIndex - 1) * pageSize
    const limit = +pageSize
    const { count, rows } = await Project.findAndCountAll({
      where: {
        ...filter
      },
      include: [
        {
          model: ProCanAss,
          as: 'ProAss'
        }
      ],
      limit,
      offset,
      distinct: true,
      order: [
        ['proStatus', 'ASC'],
        ['updateTime', 'DESC']
      ]
    })
    return {
      pageIndex: +pageIndex,
      pageSize: +pageSize,
      total: count,
      list: rows || []
    }
  }

  // 获取项目名称
  async getProjectName(query, filter) {
    const { Project } = global.M
    return Project.findAll({
      where: {
        ...filter
      },
      limit: 50,
      order: [['updateTime', 'DESC']]
    })
  }

  findAll(params) {
    return projectService.findAll(params)
  }

  async SaveProject(ctx) {
    const params = ctx.request.body
    const { Project, OperationLog, sequelize } = global.M
    let data = {}
    return sequelize
      .transaction(async t => {
        if (params.id) {
          await Project.update(
            {
              ...params,
              lastUpdateUserId: ctx.session.user.id
            },
            { where: { id: params.id }, transaction: t }
          )
        } else {
          data = await Project.create(
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
            proId: data.id || params.id,
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

  async findProject(id) {
    const { Project, OperationLog, Candidate } = global.M
    return Project.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: OperationLog,
          as: 'OperationLog',
          required: false
        },
        {
          model: Candidate,
          as: 'Candidate',
          through: {
            where: { proId: id }
          }
        }
      ],
      order: [[OperationLog, 'createTime', 'DESC']]
    })
  }
}
