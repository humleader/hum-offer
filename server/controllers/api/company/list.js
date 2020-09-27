// 获取用户列表
const Company = require('daos/company')
const { Op } = require('sequelize')

module.exports = async ctx => {
  const company = new Company()
  const filter = {}
  const {
    companyName,
    contactName,
    contactTel,
    companyCity,
    companyIndustry,
    addUserId,
    pageSize,
    pageIndex,
    type,
    updateTime
  } = ctx.query

  if (companyName) {
    filter.companyName = {
      [Op.like]: `%${companyName}%`
    }
  }
  if (contactName) {
    filter.contactName = {
      [Op.like]: `%${contactName}%`
    }
  }

  if (contactTel) {
    filter.contactTel = {
      [Op.like]: `%${contactTel}%`
    }
  }
  if (companyCity) {
    filter.companyCity = companyCity
  }
  if (companyIndustry) {
    filter.companyIndustry = companyIndustry
  }
  if (type && type !== '-1') {
    filter.type = type
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

  const data = await company.findAndCountAll({
    where: {
      ...filter
    },
    pageSize,
    pageIndex
  })

  ctx.body = {
    code: 0,
    data: data
  }
}
