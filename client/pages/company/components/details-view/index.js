import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Form, Row, Col, Radio, Collapse } from 'antd'
import moment from 'moment'

import './index.less'

import HumContainer from 'components/hum-container'
import HumBreadcrumb from 'components/hum-breadcrumb'

const FormItem = Form.Item
const RadioGroup = Radio.Group
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

class View extends Component {
  static propTypes = {
    match: PropTypes.object,
    company: PropTypes.object,
    user: PropTypes.object,
    action: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      loginPending: false
    }
  }

  componentDidMount() {
    const { match } = this.props
    const { queryById } = this.props.action
    queryById(match.params.id)
  }

  showName = (list, id) => {
    const ab = list.find(item => {
      return item.id === Number(id)
    })
    return ab ? ab.userAliasName : ''
  }

  render() {
    const { company, common } = this.props

    const editData = company.get('editData').toJS()
    const list = common.get('list')

    return (
      <div className="page-view">
        <HumBreadcrumb item={[{ name: '客户管理', link: '/company' }, { name: '预览' }]} />
        <HumContainer>
          <Form className="addforms">
            <Row gutter={24}>
              <Col span={24}>
                <FormItem {...formItemLayout} label="公司类型">
                  <RadioGroup disabled defaultValue={editData.type || 1}>
                    {companyType.map(item => {
                      return (
                        <Radio key={item.value} value={item.value}>
                          {item.label}
                        </Radio>
                      )
                    })}
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24} className="">
              <Col span={24} className="form-col">
                <FormItem className="add-formitem" {...formItemLayout50} label="公司名称">
                  {editData.companyName}
                </FormItem>

                <FormItem className="add-formitem" {...formItemLayout50} label="英文名称">
                  {editData.companyEnName}
                </FormItem>

                <FormItem className="add-formitem" {...formItemLayout50} label="城市">
                  {editData.companyCity}
                </FormItem>

                <FormItem className="add-formitem" label="行业" {...formItemLayout50}>
                  {editData.companyIndustry}
                </FormItem>

                <FormItem className="add-formitem" label="公司简写" {...formItemLayout50}>
                  {editData.companyAlias}
                </FormItem>

                <FormItem className="add-formitem" label="公司电话" {...formItemLayout50}>
                  {editData.companyTel}
                </FormItem>

                <FormItem className="add-formitem" label="地址" {...formItemLayout50}>
                  {editData.companyAddress}
                </FormItem>

                <FormItem className="add-formitem" label="邮箱" {...formItemLayout50}>
                  {editData.contactEmail}
                </FormItem>

                <FormItem className="add-formitem" label="联系人" {...formItemLayout50}>
                  {editData.contactName}
                </FormItem>

                <FormItem className="add-formitem" label="联系电话" {...formItemLayout50}>
                  {editData.contactTel}
                </FormItem>

                <FormItem className="add-formitem" label="BD" {...formItemLayout50}>
                  {this.showName(list.toJS(), editData.bdId)}
                </FormItem>

                <FormItem className="add-basis100" label="客户简介" {...formItemLayout}>
                  {editData.companyProfile}
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
                                list.toJS(),
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
                  <Link to="/company">
                    <Button type="default">返回</Button>
                  </Link>
                  <Link to={`/company/add/${editData.id}`}>
                    <Button type="primary" style={{ marginLeft: '20px' }}>
                      编辑
                    </Button>
                  </Link>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </HumContainer>
      </div>
    )
  }
}

export default Form.create()(View)
