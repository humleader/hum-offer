import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Row, Col, Input, Select, message, Upload, Icon, Collapse } from 'antd'
import history from 'common/history'
import { baseURI } from 'common/config'
import moment from 'moment'

const html = []
for (let index = 0; index < 50; index++) {
  const daytime = `${2001 - index}-12-31`
  const text = moment(daytime, 'YYYY-MM-DD').fromNow()
  const age = parseInt(text, 10)

  html.push({
    daytime: `${2001 - index}`,
    age: age
  })
}

const FormItem = Form.Item
const { TextArea } = Input
const Option = Select.Option
const Panel = Collapse.Panel

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 18 }
}
const formItemLayout50 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
}
const formItemLayoutoffset = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16, offset: 2 }
}

const FormAdd = props => {
  const { action, candidate, form, regionsDate, skill, user } = props
  const { editData } = candidate.toJS()
  const { getFieldDecorator } = form

  const [loading, setLoading] = useState(false)
  const [canTags, setCanTags] = useState(undefined)
  const [canTags2, setCanTags2] = useState(undefined)
  const [skillChild, setSkillChild] = useState([])

  useEffect(() => {
    if (editData.Skills) {
      let curItem = {}
      if (editData.Skills.parentId) {
        setCanTags(editData.Skills.parentId)
        setCanTags2(editData.Skills.id)
        curItem = skill.find(res => res.id === editData.Skills.parentId)
      } else {
        curItem = skill.find(res => res.id === editData.Skills.id)
        setCanTags(editData.Skills.id)
      }
      setSkillChild(curItem.children)
    }
    return () => {}
  }, [editData])

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    form.validateFields((err, values) => {
      if (err) {
        setLoading(false)
        return
      }
      if (values.canLocal) {
        values.canLocal = JSON.stringify(values.canLocal)
      }
      values.canTags = values.canTags2

      const temp = {
        ...editData,
        ...values,
        updateTime: editData.id ? undefined : editData.updateTime
      }
      action
        .save(temp)
        .then(() => {
          setLoading(false)
          message.success(editData.id ? `修改成功！` : `新增成功！`)
          history.push('/candidate')
        })
        .catch(res => {
          message.error(res.message)
          setLoading(false)
        })
    })
  }

  const renderCityOptions = options => {
    return options.map((item, idx) => {
      return (
        <Option key={item.id} value={item.shortName || item.id}>
          {item.shortName || item.userAliasName}
        </Option>
      )
    })
  }

  const renderBirthdayOptions = () => {
    return html.map((item, idx) => {
      return (
        <Option key={item.daytime} value={`${item.daytime}`}>
          {`${item.daytime}-${item.age}岁`}
        </Option>
      )
    })
  }

  const renderOptions = options => {
    return (
      options &&
      options.map((item, idx) => {
        return (
          <Option key={item.id} item={item} value={item.id}>
            {item.name}
          </Option>
        )
      })
    )
  }

  const handleTagChange = (id, e) => {
    const curItem = e.props.item
    const { setFieldsValue } = form
    setSkillChild(curItem.children)
    setFieldsValue({
      canTags2: undefined
    })
  }

  const handleChangeImg = info => {
    const status = info.file.status

    if (status === 'done') {
      if (info.file.response.code !== 0) {
        message.error(`文件上传失败.${info.file.response.message}`)
        info.fileList.splice(info.fileList.length - 1, 1)
        return info.fileList
      } else {
        const Eddata = info.file.response.data
        if (Eddata.canBirthday) {
          const cur = html.find(res => res.age === Number(Eddata.canBirthday))
          Eddata.canBirthday = cur.daytime
        }
        action.setEditData({ ...editData, ...Eddata })

        message.success('文件上传成功.')
      }
    } else if (status === 'error') {
      message.error(`${info.file.name} 文件上传失败.`)
    }
    return info && info.fileList
  }

  const showName = (list, id) => {
    const ab = list.find(item => {
      return item.id === id
    })
    return ab ? ab.userAliasName : ''
  }

  return (
    <Form className="addforms">
      <Row gutter={24} className="">
        <Col span={24} className="form-col">
          <FormItem className="add-basis100 form-uploader" {...formItemLayout} label="附件：">
            {getFieldDecorator('attachment', {
              valuePropName: 'fileList',
              rules: [],
              getValueFromEvent: handleChangeImg
            })(
              <Upload
                action={`${baseURI}/api/upload/autoupload`}
                showUploadList={false}
                className="avatar-uploader"
              >
                <Button>
                  <Icon type="upload" /> {editData.canAttachment ? '更新附件' : '请上传附件'}
                </Button>
                {editData.canAttachment && (
                  <span>
                    <Icon type="link" />
                    {decodeURIComponent(editData.canAttachment.split('document/')[1])}
                  </span>
                )}
              </Upload>
            )}
          </FormItem>
          <FormItem className="add-formitem" {...formItemLayout50} label="姓名">
            {getFieldDecorator('canName', {
              initialValue: editData.canName,
              rules: [{ required: true, message: '请填写姓名' }]
            })(<Input />)}
          </FormItem>

          <FormItem className="add-formitem" {...formItemLayout50} label="英文姓名">
            {getFieldDecorator('canEnName', {
              initialValue: editData.canEnName,
              rules: []
            })(<Input />)}
          </FormItem>

          <FormItem className="add-formitem" {...formItemLayout50} label="性别">
            {getFieldDecorator('canSex', {
              initialValue: editData.canSex,
              rules: [{ required: true, message: '请选择性别' }]
            })(
              <Select style={{ width: 200 }} placeholder="请选择">
                <Option value="男">男</Option>
                <Option value="女">女</Option>
              </Select>
            )}
          </FormItem>

          <FormItem className="add-formitem" label="年龄" {...formItemLayout50}>
            {getFieldDecorator('canBirthday', {
              initialValue: editData.canBirthday,
              rules: []
            })(
              <Select
                showSearch
                placeholder="请选择"
                filterOption={(input, option) => {
                  return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }}
              >
                {renderBirthdayOptions()}
              </Select>
            )}
          </FormItem>

          <FormItem className="add-formitem" {...formItemLayout50} label="所在城市">
            {getFieldDecorator('canCity', {
              initialValue: editData.canCity,
              rules: []
            })(
              <Select
                showSearch
                placeholder="请选择城市"
                filterOption={(input, option) => {
                  return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }}
              >
                {renderCityOptions(regionsDate.toJS())}
              </Select>
            )}
          </FormItem>

          <FormItem className="add-formitem" {...formItemLayout50} label="期望城市">
            {getFieldDecorator('canLocal', {
              initialValue: editData.canLocal && JSON.parse(editData.canLocal),
              rules: []
            })(
              <Select
                mode="multiple"
                showSearch
                placeholder="请选择城市"
                filterOption={(input, option) => {
                  return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }}
              >
                {renderCityOptions(regionsDate.toJS())}
              </Select>
            )}
          </FormItem>

          <FormItem className="add-formitem" label="邮箱" {...formItemLayout50}>
            {getFieldDecorator('canEmail', {
              initialValue: editData.canEmail,
              rules: []
            })(<Input type="email" />)}
          </FormItem>

          <FormItem className="add-formitem" label="手机" {...formItemLayout50}>
            {getFieldDecorator('canPhone', {
              initialValue: editData.canPhone,
              rules: [{ required: true, message: '请填写手机' }]
            })(<Input />)}
          </FormItem>

          <FormItem className="add-formitem" label="目前公司" {...formItemLayout50}>
            {getFieldDecorator('canCompany', {
              initialValue: editData.canCompany,
              rules: []
            })(<Input />)}
          </FormItem>

          <FormItem className="add-formitem" label="职位" {...formItemLayout50}>
            {getFieldDecorator('canPosition', {
              initialValue: editData.canPosition,
              rules: []
            })(<Input />)}
          </FormItem>

          <FormItem className="add-formitem" label="薪资" {...formItemLayout50}>
            {getFieldDecorator('canSalary', {
              initialValue: editData.canSalary,
              rules: []
            })(<Input />)}
          </FormItem>

          <FormItem className="add-formitem" label="学历" {...formItemLayout50}>
            {getFieldDecorator('canEducation', {
              initialValue: editData.canEducation,
              rules: []
            })(
              <Select>
                <Option value="高中">高中</Option>
                <Option value="中专">中专</Option>
                <Option value="大专">大专</Option>
                <Option value="本科">本科</Option>
                <Option value="硕士">硕士</Option>
                <Option value="博士">博士</Option>
                <Option value="MBA/EMBA">MBA/EMBA</Option>
                <Option value="专升本">专升本</Option>
              </Select>
            )}
          </FormItem>

          <FormItem className="add-basis100" label="职业分类" {...formItemLayout}>
            {getFieldDecorator('canTags', {
              initialValue: canTags,
              rules: [{ required: true, message: '请填写职业分类' }]
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="请选择"
                onChange={handleTagChange}
                filterOption={(input, option) => {
                  return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }}
              >
                {renderOptions(skill)}
              </Select>
            )}
            <FormItem className="add-formselect" {...formItemLayout50}>
              {getFieldDecorator('canTags2', {
                initialValue: canTags2,
                rules: [{ required: true, message: '请填写职业分类' }]
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择"
                  filterOption={(input, option) => {
                    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }}
                >
                  {renderOptions(skillChild)}
                </Select>
              )}
            </FormItem>
          </FormItem>

          <FormItem className="add-basis100" label="备注" {...formItemLayout}>
            {getFieldDecorator('comment', {
              rules: [{}]
            })(<TextArea rows={4} />)}
          </FormItem>
          {editData.OperationLog && editData.OperationLog.length ? (
            <FormItem className="add-formitem" label="编辑记录" {...formItemLayout50}>
              <Collapse accordion>
                {editData.OperationLog &&
                  editData.OperationLog.map((item, index) => {
                    if (index > 10) {
                      return ''
                    }
                    return (
                      <Panel
                        header={`${showName(user.toJS(), item.lastUpdateUserId)} ${moment(
                          item.createTime
                        ).format('YYYY-MM-DD HH:mm:ss')}`}
                        key={index}
                      >
                        {item.comment}
                      </Panel>
                    )
                  })}
              </Collapse>
            </FormItem>
          ) : null}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <FormItem {...formItemLayoutoffset}>
            <Link to="/candidate">
              <Button type="default">取消</Button>
            </Link>
            <Button
              type="primary"
              loading={loading}
              style={{ marginLeft: '20px' }}
              onClick={handleSubmit}
            >
              确定
            </Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  )
}

export default Form.create()(FormAdd)
