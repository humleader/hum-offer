// 获取用户列表
const Company = require('daos/company')
module.exports = async ctx => {
  const company = new Company()

  const companyData = await company.getCompanyToProject()

  const data = companyData.map(item => {
    const temp = {
      id: item.id,
      companyName: item.companyName
    }
    return temp
  })

  ctx.body = {
    code: 0,
    data: data
  }
}
