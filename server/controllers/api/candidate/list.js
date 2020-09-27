const Candidate = require('daos/candidate')
const { Op } = require('sequelize')

module.exports = async ctx => {
  const candidate = new Candidate()
  const filter = {}
  const {
    canName,
    canPhone,
    canSalary,
    canCompany,
    createTime,
    addUserId,
    canCity,
    canPosition,
    canTags
  } = ctx.query

  if (canName) {
    filter.canName = {
      [Op.like]: `%${canName}%`
    }
  }
  if (canPhone) {
    filter.canPhone = {
      [Op.like]: `%${canPhone}%`
    }
  }
  if (canTags) {
    filter.canTags = canTags
  }

  if (canPosition) {
    filter.canPosition = {
      [Op.like]: `%${canPosition}%`
    }
  }
  if (canCity) {
    filter.canCity = {
      [Op.like]: `%${canCity}%`
    }
  }

  if (canSalary) {
    filter.canSalary = {
      [Op.like]: `%${canSalary}%`
    }
  }
  if (canCompany) {
    filter.canCompany = {
      [Op.like]: `%${canCompany}%`
    }
  }
  if (addUserId) {
    filter.addUserId = addUserId
  }
  if (createTime) {
    const start = new Date(`${createTime[0]} 00:00:00`)
    const end = new Date(`${createTime[1]} 24:00:00`)

    filter.createTime = {
      [Op.lt]: end,
      [Op.gt]: start
    }
  }

  const data = await candidate.getCandidateList(ctx.query, filter)

  ctx.body = {
    code: 0,
    data: data
  }
}
