import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Form, Row, Col, Input, Radio, Select, message } from 'antd'
import history from 'common/history'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const { TextArea } = Input
const Option = Select.Option

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

class FormAdd extends Component {
  static propTypes = {
    form: PropTypes.object,
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
    const { action, form } = this.props
    this.setState({
      loginPending: true
    })
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      action
        .save(values)
        .then(() => {
          this.setState({
            loginPending: false
          })
          message.success(`新增成功！`)
          history.push('/company')
        })
        .catch(res => {
          message.error(res.message)
          this.setState({
            loginPending: false
          })
        })
    })
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
    const { form, userList, regionsDate } = this.props

    const { getFieldDecorator } = form

    return (
      <Form className="addforms" onSubmit={this.handleSubmit}>
        <Row gutter={24}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="公司类型">
              {getFieldDecorator('type', {
                initialValue: 1,
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
                rules: [{}]
              })(<Input />)}
            </FormItem>

            <FormItem className="add-formitem" {...formItemLayout50} label="城市">
              {getFieldDecorator('companyCity', {
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
                rules: [{}]
              })(<Input />)}
            </FormItem>
            <FormItem className="add-formitem" label="公司电话" {...formItemLayout50}>
              {getFieldDecorator('companyTel', {
                rules: []
              })(<Input />)}
            </FormItem>
            <FormItem className="add-formitem" label="地址" {...formItemLayout50}>
              {getFieldDecorator('companyAddress', {
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
                rules: [
                  {
                    required: true,
                    message: '请选择BD'
                  }
                ]
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择BD"
                  filterOption={(input, option) => {
                    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }}
                >
                  {this.renderOptions(userList.toJS())}
                </Select>
              )}
            </FormItem>
            <FormItem className="add-basis100" label="客户简介" {...formItemLayout}>
              {getFieldDecorator('companyProfile', {
                rules: [{}]
              })(<TextArea rows={4} />)}
            </FormItem>

            <FormItem className="add-basis100" label="备注" {...formItemLayout}>
              {getFieldDecorator('comment', {
                rules: [{}]
              })(<TextArea rows={4} />)}
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

export default Form.create()(FormAdd)
