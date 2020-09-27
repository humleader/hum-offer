// 获取用户列表
const Company = require('daos/company')
module.exports = async ctx => {
  const company = new Company()

  const data = await company.findOne(ctx.query.id)

  const oneData = {
    ...data.dataValues
  }

  ctx.body = {
    code: 0,
    data: oneData
  }
}
