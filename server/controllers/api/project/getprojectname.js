const Project = require('daos/project')

module.exports = async ctx => {
  const project = new Project()
  const filter = {}
  const { proName } = ctx.query

  if (proName) {
    filter.proName = {
      like: `%${proName}%`
    }
  }

  const data = await project.getProjectName(ctx.query, filter)

  ctx.body = {
    code: 0,
    data: data
  }
}
