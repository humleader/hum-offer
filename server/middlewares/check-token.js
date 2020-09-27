const env = process.env.NODE_ENV || 'development'

module.exports = function() {
  return async function(ctx, next) {
    if (!ctx.session && ctx.path.indexOf('/api') !== -1 && env !== 'development') {
      ctx.status = 401
      ctx.body = {
        code: 1,
        error: '用户登录已失效'
      }
    } else {
      await next()
    }
  }
}
