const Project = require('daos/project')
const { Op } = require('sequelize')

module.exports = async ctx => {
  const project = new Project()
  const filter = {}
  const { proName, proCity, proStatus, updateTime, addUserId } = ctx.query

  if (proName) {
    filter.proName = {
      [Op.like]: `%${proName}%`
    }
  }
  if (proCity) {
    filter.proCity = {
      like: `%${proCity}%`
    }
  }
  if (proStatus && proStatus !== '-1') {
    filter.proStatus = proStatus
  }
  if (addUserId) {
    filter.addUserId = addUserId
  }
  if (updateTime) {
    const start = new Date(`${updateTime[0]} 00:00:00`)
    const end = new Date(`${updateTime[1]} 24:00:00`)

    filter.updateTime = {
      [Op.lt]: end,
      [Op.gt]: start
    }
  }

  const data = await project.getProjectList(ctx.query, filter)

  ctx.body = {
    code: 0,
    data: data
  }
}
