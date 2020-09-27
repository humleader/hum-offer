import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Form, Row, Col, Tabs, Collapse } from 'antd'
import moment from 'moment'

import './index.less'

import HumContainer from 'components/hum-container'
import HumBreadcrumb from 'components/hum-breadcrumb'

import DetailTable from '../detail-table'
import Detail from 'components/detail'

const FormItem = Form.Item
const Panel = Collapse.Panel
const TabPane = Tabs.TabPane

const projectStatus = ['Active', 'Pending', 'Complete', 'Close']

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
    form: PropTypes.object,
    match: PropTypes.object,
    common: PropTypes.object,
    project: PropTypes.object,
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

  showName = (list, id) => {
    const ab = list.find(item => {
      return item.id === id
    })
    return ab ? ab.userAliasName : ''
  }

  showCompany = (list, id) => {
    const ab = list.find(item => {
      return item.id === id
    })
    return ab ? ab.companyName : ''
  }

  componentDidMount() {
    const { queryToproject } = this.props.action
    this.queryById()
    queryToproject()
  }

  queryById = () => {
    const { match } = this.props
    const { id } = match.params || {}
    const { queryById } = this.props.action
    if (id) {
      queryById(match.params.id)
    }
  }

  render() {
    const { project, company, common, action } = this.props

    const toproject = company.get('toproject').toJS()
    const editData = project.get('editData').toJS()
    const modal = common.get('modal')
    const list = common.get('list')

    return (
      <div className="page-view">
        <HumBreadcrumb item={[{ name: '项目管理', link: '/project' }, { name: '预览' }]} />
        <HumContainer>
          <Tabs defaultActiveKey="1">
            <TabPane tab="项目信息" key="1">
              <Form className="addforms">
                <Row gutter={24} className="">
                  <Col span={24} className="form-col">
                    <FormItem className="add-formitem" {...formItemLayout50} label="项目名称">
                      {editData.proName}
                    </FormItem>

                    <FormItem className="add-formitem" {...formItemLayout50} label="所属客户">
                      {this.showCompany(toproject, editData.proCompany)}
                    </FormItem>

                    <FormItem className="add-formitem" {...formItemLayout50} label="项目状态">
                      {projectStatus[editData.proStatus]}
                    </FormItem>

                    <FormItem className="add-formitem" {...formItemLayout50} label="城市">
                      {editData.proCity && JSON.parse(editData.proCity).join(',')}
                    </FormItem>

                    <FormItem className="add-formitem" label="HC" {...formItemLayout50}>
                      {editData.proHc}
                    </FormItem>

                    <FormItem className="add-formitem" label="薪资" {...formItemLayout50}>
                      {editData.proSalary}
                    </FormItem>

                    <FormItem className="add-formitem" label="保证期" {...formItemLayout50}>
                      {editData.proGuarantee}
                    </FormItem>

                    <FormItem className="add-formitem" label="收费" {...formItemLayout50}>
                      {editData.proBilling}
                    </FormItem>

                    <FormItem className="add-formitem" label="项目时间" {...formItemLayout50}>
                      {`${moment(editData.proStartTime).format('YYYY-MM-DD')}~${moment(
                        editData.proEndTime
                      ).format('YYYY-MM-DD')}`}
                    </FormItem>

                    <FormItem className="add-basis100" label="JD" {...formItemLayout}>
                      {editData.proJd}
                    </FormItem>

                    {editData.OperationLog && editData.OperationLog.length ? (
                      <FormItem className="add-basis100" label="编辑记录" {...formItemLayout}>
                        <Collapse
                          defaultActiveKey={editData.OperationLog.map((item, index) => {
                            return index + ''
                          })}
                        >
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
                      </FormItem>
                    ) : null}
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={24}>
                    <FormItem {...formItemLayoutoffset}>
                      <Link to="/project/back">
                        <Button type="default">取消</Button>
                      </Link>
                      <Link to={`/project/add/${editData.id}`}>
                        <Button type="primary" style={{ marginLeft: '20px' }}>
                          编辑
                        </Button>
                      </Link>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </TabPane>
            <TabPane tab="候选人" key="2">
              <DetailTable datatable={editData} action={action} />
            </TabPane>
          </Tabs>
        </HumContainer>
        <Detail modal={modal} action={action} callback={this.queryById} />
      </div>
    )
  }
}

export default Form.create()(View)
