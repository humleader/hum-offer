// 获取用户列表
const Candidate = require('daos/candidate')
const { Op } = require('sequelize')

module.exports = async ctx => {
  const candidate = new Candidate()

  const filter = {}
  const { endTime, startTime } = ctx.query

  if (endTime && startTime) {
    const start = new Date(`${startTime} 00:00:00`)
    const end = new Date(`${endTime} 24:00:00`)

    filter.createTime = {
      [Op.lt]: end,
      [Op.gt]: start
    }
  }

  const data = await candidate.getCountCandidate(ctx.query, filter)

  ctx.body = {
    code: 0,
    data: data
  }
}
