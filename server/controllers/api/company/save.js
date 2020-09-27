// 新增公司
const Company = require('daos/company')
module.exports = async ctx => {
  const company = new Company()
  const { id, companyName } = ctx.request.body
  let filter
  if (!id) {
    filter = await company.filterNameCompany(companyName)
  }
  if (!(filter && filter.length)) {
    await company.SaveCompany(ctx)
    ctx.body = {
      code: 0,
      data: ''
    }
  } else {
    ctx.body = {
      code: 1,
      error: '公司已存在'
    }
  }
}
