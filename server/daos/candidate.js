module.exports = class {
  async getCandidateList(query, filter) {
    const { Candidate } = global.M
    const { pageIndex = 1, pageSize = 20 } = query
    const offset = (pageIndex - 1) * pageSize
    const limit = +pageSize
    const { count, rows } = await Candidate.findAndCountAll({
      where: {
        ...filter
      },
      limit,
      offset,
      order: [['createTime', 'DESC']]
    })
    return {
      pageIndex: +pageIndex,
      pageSize: +pageSize,
      total: count,
      list: rows || []
    }
  }

  async getCountCandidate(query, filter) {
    const { Candidate, sequelize } = global.M

    return Candidate.findAll({
      where: {
        ...filter
      },
      attributes: [
        [sequelize.fn('count', sequelize.col('Candidate.add_user_id')), 'count'],
        ['add_user_id', 'addUserId']
      ],
      group: ['Candidate.add_user_id']
    })
  }

  async SaveCandidate(ctx) {
    const params = ctx.request.body
    const { Candidate, OperationLog, sequelize } = global.M
    let data = {}
    return sequelize
      .transaction(async t => {
        if (params.id) {
          await Candidate.update(
            {
              ...params,
              lastUpdateUserId: ctx.session.user.id
            },
            { where: { id: params.id }, transaction: t }
          )
        } else {
          data = await Candidate.create(
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
            candidateId: data.id || params.id,
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
      .catch(res => {
        console.log(res)
      })
  }

  async filterMobileCandidate(canPhone) {
    const { Candidate } = global.M
    return Candidate.findAll({
      where: {
        canPhone
      }
    })
  }

  async findCandidate(id) {
    const { Candidate, OperationLog, Project, Skills } = global.M
    return Candidate.findOne({
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
          model: Skills,
          as: 'Skills',
          required: false
        },
        {
          model: Project,
          as: 'Project',
          through: {
            where: { candidateId: id }
          }
        }
      ],
      order: [[OperationLog, 'createTime', 'DESC']]
    })
  }
}
