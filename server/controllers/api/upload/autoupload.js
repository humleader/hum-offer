var textract = require('textract')
var aliOss = require('utils/ali-oss')
var todocx = require('utils/todocx')
const fs = require('fs')
module.exports = async ctx => {
  let res
  const paths = ctx.request.files.file.path
  try {
    const stream = fs.createReadStream(paths)
    const fBuffer = fs.readFileSync(paths)
    const result = {}
    const fileFun = (mime, buffer) => {
      return new Promise((resolve, reject) => {
        try {
          textract.fromBufferWithMime(mime, buffer, (error, text) => {
            if (error) {
              console.log(error)
              resolve(error)
              return
            }
            const canName = text.match(/姓名： (.*?) /)
            const canPhone = text.match(/手机号码： (.*?) /)
            const canSex = text.match(/性别： (.*?) /)
            const canBirthday = text.match(/年龄： (.*?) /)
            const canEducation = text.match(/教育程度： (.*?) /)
            const canEmail = text.match(/电子邮件： (.*?) /)
            const canCity = text.match(/所在地： (.*?) /)
            const canCompany = text.match(/公司名称： (.*?) /)
            const canPosition = text.match(/所任职位： (.*?) /)
            if (canName) {
              result.canName = canName[1]
            }
            if (canPhone) {
              result.canPhone = canPhone[1]
            }
            if (canSex) {
              result.canSex = canSex[1]
            }
            if (canBirthday) {
              result.canBirthday = canBirthday[1]
            }
            if (canEducation) {
              result.canEducation = canEducation[1]
            }
            if (canEmail) {
              result.canEmail = canEmail[1]
            }
            if (canCity) {
              result.canCity = canCity[1]
            }
            if (canCompany) {
              result.canCompany = canCompany[1]
            }
            if (canPosition) {
              result.canPosition = canPosition[1]
            }
            resolve()
          })
        } catch (error) {
          console.log(error)
          resolve(error)
        }
      })
    }
    const results = await aliOss.putStream(`document/${ctx.request.files.file.name}`, stream)
    result.canAttachment = results.url
    const houzui = paths.split('.')
    if (houzui[houzui.length - 1] === 'docx') {
      await fileFun(ctx.request.files.file.type, fBuffer)
    } else if (houzui[houzui.length - 1] === 'doc') {
      const buffer = await todocx(fBuffer)
      await fileFun('text/plain', buffer)
    }

    res = {
      code: 0,
      data: result
    }
  } catch (error) {
    res = {
      code: 1,
      error: '上传文件失败！'
    }
  }
  fs.unlinkSync(ctx.request.files.file.path)

  ctx.body = res
}
