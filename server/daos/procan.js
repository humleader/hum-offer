module.exports = class {
  async SaveProCan(ctx) {
    const params = ctx.request.body
    const { ProCanAss } = global.M

    if (params.id) {
      await ProCanAss.update(
        {
          ...params,
          lastUpdateUserId: ctx.session.user.id
        },
        { where: { id: params.id } }
      )
      return true
    } else {
      const findOne = await ProCanAss.findOne({
        where: {
          candidateId: params.candidateId,
          proId: params.proId
        }
      })
      if (!findOne) {
        await ProCanAss.create({
          ...params,
          addUserId: ctx.session.user.id
        })
        return true
      } else {
        return false
      }
    }
  }
}
