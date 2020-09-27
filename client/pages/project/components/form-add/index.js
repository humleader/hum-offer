import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Form, Row, Col, Input, DatePicker, Select, message } from 'antd'
import moment from 'moment'
import history from 'common/history'

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker
const { TextArea } = Input
const Option = Select.Option

const projectStatus = [
  {
    label: 'Active',
    id: 0
  },
  {
    label: 'Pending',
    id: 1
  },
  {
    label: 'Complete',
    id: 2
  },
  {
    label: 'Close',
    id: 3
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
    company: PropTypes.object,
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

      values.proCity = JSON.stringify(values.proCity)

      values.proStartTime = values.proRangeTime[0]
      values.proEndTime = values.proRangeTime[1]

      const temp = {
        ...values,
        proRangeTime: undefined
      }
      action.save(temp).then(() => {
        this.setState({
          loginPending: false
        })
        message.success(`新增成功！`)
        history.push('/project')
      })
    })
  }

  renderCityOptions = options => {
    return options.map((item, idx) => {
      return (
        <Option key={item.id} value={item.shortName || item.id}>
          {item.shortName || item.userAliasName}
        </Option>
      )
    })
  }

  renderOptions = options => {
    return options.map((item, idx) => {
      return (
        <Option key={item.id} value={item.id}>
          {item.label || item.companyName}
        </Option>
      )
    })
  }

  disabledDate = current => {
    return (
      current <
      moment()
        .endOf('day')
        .add(-1, 'days')
    )
  }

  render() {
    const { form, company, regionsDate } = this.props

    const toproject = company.get('toproject')

    const { getFieldDecorator } = form

    return (
      <Form className="addforms" onSubmit={this.handleSubmit}>
        <Row gutter={24} className="">
          <Col span={24} className="form-col">
            <FormItem className="add-formitem" {...formItemLayout50} label="项目名称">
              {getFieldDecorator('proName', {
                rules: [
                  {
                    required: true,
                    message: '请填写项目名称'
                  }
                ]
              })(<Input />)}
            </FormItem>

            <FormItem className="add-formitem" {...formItemLayout50} label="所属客户">
              {getFieldDecorator('proCompany', {
                rules: [{ required: true, message: '请选择公司' }]
              })(
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  placeholder="请选择公司"
                >
                  {this.renderOptions(toproject.toJS())}
                </Select>
              )}
            </FormItem>

            <FormItem className="add-formitem" {...formItemLayout50} label="项目状态">
              {getFieldDecorator('proStatus', {
                rules: [
                  {
                    required: true,
                    message: '请选择项目状态'
                  }
                ]
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择项目状态"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.renderOptions(projectStatus)}
                </Select>
              )}
            </FormItem>

            <FormItem className="add-formitem" {...formItemLayout50} label="城市">
              {getFieldDecorator('proCity', {
                rules: [
                  {
                    required: true,
                    message: '请选择城市'
                  }
                ]
              })(
                <Select
                  mode="multiple"
                  showSearch
                  placeholder="请选择城市"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.renderCityOptions(regionsDate.toJS())}
                </Select>
              )}
            </FormItem>

            <FormItem className="add-formitem" label="HC" {...formItemLayout50}>
              {getFieldDecorator('proHc', {
                rules: [{ required: true, message: '请填写HC' }]
              })(<Input />)}
            </FormItem>

            <FormItem className="add-formitem" label="薪资" {...formItemLayout50}>
              {getFieldDecorator('proSalary', {
                rules: [{ required: true, message: '请填写薪资' }]
              })(<Input />)}
            </FormItem>

            <FormItem className="add-formitem" label="保证期" {...formItemLayout50}>
              {getFieldDecorator('proGuarantee', {
                rules: [{ required: true, message: '请填写保证期' }]
              })(<Input />)}
            </FormItem>

            <FormItem className="add-formitem" label="收费" {...formItemLayout50}>
              {getFieldDecorator('proBilling', {
                rules: [{ required: true, message: '请填写收费' }]
              })(<Input />)}
            </FormItem>

            <FormItem className="add-formitem" label="项目时间" {...formItemLayout50}>
              {getFieldDecorator('proRangeTime', {
                rules: [{ required: true, message: '请选择时间区间' }]
              })(<RangePicker disabledDate={this.disabledDate} allowClear format="YYYY-MM-DD" />)}
            </FormItem>

            <FormItem className="add-basis100" label="JD" {...formItemLayout}>
              {getFieldDecorator('proJd', {
                rules: [{ required: true, message: '请填写JD' }]
              })(<TextArea rows={6} />)}
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
              <Link to="/project/back">
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
