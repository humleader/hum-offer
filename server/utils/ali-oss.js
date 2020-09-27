const aliOss = require('ali-oss')

const config = require('./config')

const { accessKeyId, accessKeySecret } = config

const env = process.env.NODE_ENV || 'development'

const store = aliOss({
  accessKeyId: accessKeyId,
  accessKeySecret: accessKeySecret,
  bucket: env === 'development' ? 'humtest' : 'anthonyli',
  region: 'oss-cn-shanghai'
})

module.exports = store
