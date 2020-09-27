// 新增
const Procan = require('daos/procan')
module.exports = async ctx => {
  const procan = new Procan()
  const flag = await procan.SaveProCan(ctx)
  if (flag) {
    ctx.body = {
      code: 0,
      data: ''
    }
  } else {
    ctx.body = {
      code: 1,
      error: '候选人已经推荐过，去详情修改状态'
    }
  }
}
