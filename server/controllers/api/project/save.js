const Project = require('daos/project')

module.exports = async ctx => {
  const project = new Project()

  await project.SaveProject(ctx)

  ctx.body = {
    code: 0,
    data: ''
  }
}
