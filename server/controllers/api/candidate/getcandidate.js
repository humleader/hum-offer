// 获取用户列表
const Candidate = require('daos/candidate')

module.exports = async ctx => {
  const candidate = new Candidate()

  const data = await candidate.findCandidate(ctx.query.id)

  const oneData = {
    ...data.dataValues
  }

  ctx.body = {
    code: 0,
    data: oneData
  }
}
