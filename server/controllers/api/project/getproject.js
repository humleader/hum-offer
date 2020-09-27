// 获取用户列表
const Project = require('daos/project')
module.exports = async ctx => {
  const project = new Project()

  const data = await project.findProject(ctx.query.id)

  const oneData = {
    ...data.dataValues
  }

  ctx.body = {
    code: 0,
    data: oneData
  }
}
