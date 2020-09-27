import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Form, Row, Col, Input, Radio, Select, message, Collapse } from 'antd'
import history from 'common/history'
import moment from 'moment'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const { TextArea } = Input
const Option = Select.Option
const Panel = Collapse.Panel

const companyType = [
  {
    label: '普通公司',
    value: 0
  },
  {
    label: '开发中的客户',
    value: 1
  },
  {
    label: '已签约的客户',
    value: 2
  },
  {
    label: '历史客户',
    value: 3
  }
]

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

class FormEdit extends Component {
  static propTypes = {
    form: PropTypes.object,
    company: PropTypes.object,
    regionsDate: PropTypes.object,
    user: PropTypes.object,
    action: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      loginPending: false
    }
  }

  componentDidMount() {}

  handleSubmit = e => {
    e.preventDefault()
    const { action, form, company } = this.props
    this.setState({
      loginPending: true
    })
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      const editData = company.get('editData').toJS()

      const temp = {
        ...editData,
        ...values,
        updateTime: undefined
      }

      action
        .save(temp)
        .then(() => {
          this.setState({
            loginPending: false
          })
          message.success(`修改成功！`)
          history.push('/company')
        })
        .catch(res => {
          this.setState({
            loginPending: false
          })
        })
    })
  }

  showName = (list, id) => {
    const ab = list.find(item => {
      return item.id === Number(id)
    })
    return ab ? ab.userAliasName : ''
  }

  renderOptions = options => {
    return options.map((item, idx) => {
      return (
        <Option key={item.id} value={item.shortName || item.id}>
          {item.shortName || item.userAliasName}
        </Option>
      )
    })
  }

  render() {
    const { form, company, userList, regionsDate } = this.props

    const editData = company.get('editData').toJS()

    const { getFieldDecorator } = form

    return (
      <Form className="addforms" onSubmit={this.handleSubmit}>
        <Row gutter={24}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="公司类型">
              {getFieldDecorator('type', {
                initialValue: editData.type || 1,
                rules: [
                  {
                    required: true,
                    message: '请选择公司类型'
                  }
                ]
              })(
                <RadioGroup>
                  {companyType.map(item => {
                    return (
                      <Radio key={item.value} value={item.value}>
                        {item.label}
                      </Radio>
                    )
                  })}
                </RadioGroup>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24} className="">
          <Col span={24} className="form-col">
            <FormItem className="add-formitem" {...formItemLayout50} label="公司名称">
              {getFieldDecorator('companyName', {
                initialValue: editData.companyName,
                rules: [
                  {
                    required: true,
                    message: '请填写公司名称'
                  }
                ]
              })(<Input />)}
            </FormItem>

            <FormItem className="add-formitem" {...formItemLayout50} label="英文名称">
              {getFieldDecorator('companyEnName', {
                initialValue: editData.companyEnName,
                rules: [{}]
              })(<Input />)}
            </FormItem>

            <FormItem className="add-formitem" {...formItemLayout50} label="城市">
              {getFieldDecorator('companyCity', {
                initialValue: editData.companyCity,
                rules: [
                  {
                    required: true,
                    message: '请选择城市'
                  }
                ]
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择城市"
                  filterOption={(input, option) => {
                    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }}
                >
                  {this.renderOptions(regionsDate.toJS())}
                </Select>
              )}
            </FormItem>

            <FormItem className="add-formitem" label="行业" {...formItemLayout50}>
              {getFieldDecorator('companyIndustry', {
                initialValue: editData.companyIndustry,
                rules: [
                  {
                    required: true,
                    message: '请填写行业'
                  }
                ]
              })(<Input />)}
            </FormItem>

            <FormItem className="add-formitem" label="公司简写" {...formItemLayout50}>
              {getFieldDecorator('companyAlias', {
                initialValue: editData.companyAlias,
                rules: [{}]
              })(<Input />)}
            </FormItem>

            <FormItem className="add-formitem" label="公司电话" {...formItemLayout50}>
              {getFieldDecorator('companyTel', {
                initialValue: editData.companyTel,
                rules: []
              })(<Input />)}
            </FormItem>

            <FormItem className="add-formitem" label="地址" {...formItemLayout50}>
              {getFieldDecorator('companyAddress', {
                initialValue: editData.companyAddress,
                rules: [
                  {
                    required: true,
                    message: '请填写地址'
                  }
                ]
              })(<Input />)}
            </FormItem>

            <FormItem className="add-formitem" label="邮箱" {...formItemLayout50}>
              {getFieldDecorator('contactEmail', {
                initialValue: editData.contactEmail,
                rules: [
                  {
                    required: true,
                    message: '请填写邮箱地址'
                  }
                ]
              })(<Input type="email" />)}
            </FormItem>

            <FormItem className="add-formitem" label="联系人" {...formItemLayout50}>
              {getFieldDecorator('contactName', {
                initialValue: editData.contactName,
                rules: [
                  {
                    required: true,
                    message: '请填写联系人'
                  }
                ]
              })(<Input />)}
            </FormItem>

            <FormItem className="add-formitem" label="联系电话" {...formItemLayout50}>
              {getFieldDecorator('contactTel', {
                initialValue: editData.contactTel,
                rules: [
                  {
                    required: true,
                    message: '请填写联系电话'
                  }
                ]
              })(<Input />)}
            </FormItem>

            <FormItem className="add-formitem" label="BD" {...formItemLayout50}>
              {getFieldDecorator('bdId', {
                initialValue: Number(editData.bdId || 1),
                rules: [
                  {
                    required: true,
                    message: '请选择BD'
                  }
                ]
              })(
                <Select style={{ width: 200 }} disabled>
                  {this.renderOptions(userList.toJS())}
                </Select>
              )}
            </FormItem>

            <FormItem className="add-basis100" label="客户简介" {...formItemLayout}>
              {getFieldDecorator('companyProfile', {
                initialValue: editData.companyProfile,
                rules: [{}]
              })(<TextArea rows={4} />)}
            </FormItem>

            <FormItem className="add-formitem" label="备注" {...formItemLayout50}>
              {getFieldDecorator('comment', {
                rules: [{}]
              })(<TextArea rows={6} />)}
            </FormItem>
            <FormItem className="add-formitem" label="编辑记录" {...formItemLayout50}>
              {editData.OperationLog && editData.OperationLog.length ? (
                <Collapse accordion>
                  {editData.OperationLog &&
                    editData.OperationLog.map((item, index) => {
                      if (index > 10) {
                        return ''
                      }
                      return (
                        <Panel
                          header={`${this.showName(
                            userList.toJS(),
                            item.lastUpdateUserId
                          )} ${moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}`}
                          key={index}
                        >
                          {item.comment}
                        </Panel>
                      )
                    })}
                </Collapse>
              ) : null}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <FormItem {...formItemLayoutoffset}>
              <Link to="/company/back">
                <Button type="default">取消</Button>
              </Link>
              <Button
                type="primary"
                loading={this.state.loginPending}
                style={{ marginLeft: '20px' }}
                htmlType="submit"
              >
                确定
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(FormEdit)
