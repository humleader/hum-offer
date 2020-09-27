const Candidate = require('daos/candidate')

module.exports = async ctx => {
  const candidate = new Candidate()

  const { id, canPhone } = ctx.request.body
  let filter
  if (!id) {
    filter = await candidate.filterMobileCandidate(canPhone)
  }
  if (!(filter && filter.length)) {
    await candidate.SaveCandidate(ctx)
    ctx.body = {
      code: 0,
      data: ''
    }
  } else {
    ctx.body = {
      code: 1,
      error: '候选人手机已存在'
    }
  }
}
