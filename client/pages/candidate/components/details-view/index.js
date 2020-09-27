import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Row, Col, Tabs, Collapse, Icon } from 'antd'
import moment from 'moment'

import './index.less'

import { baseURI } from 'common/config'
import HumContainer from 'components/hum-container'
import HumBreadcrumb from 'components/hum-breadcrumb'

import DetailTable from '../detail-table'
import Detail from 'components/detail'

const FormItem = Form.Item
const Panel = Collapse.Panel
const TabPane = Tabs.TabPane

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

const Views = props => {
  const { match, action, candidate, common } = props
  const { id } = match.params || {}

  const skill = candidate.get('skill').toJS()
  const modal = common.get('modal')
  const editData = candidate.get('editData').toJS()
  const list = common.get('list')

  const [canTags, setCanTags] = useState(null)
  const [canTags2, setCanTags2] = useState(null)

  let canBirthday
  if (editData.canBirthday && editData.canBirthday.indexOf('-') !== -1) {
    const text = moment(editData.canBirthday, 'YYYY-MM-DD').fromNow()
    canBirthday = parseInt(text, 10)
  } else {
    const text = moment(`${editData.canBirthday}-12-31`, 'YYYY-MM-DD').fromNow()
    canBirthday = parseInt(text, 10)
  }

  useEffect(() => {
    action.getSkill()
    if (id) {
      action.queryById(id)
    }
    return () => {
      action.setEditData({})
    }
  }, [id])

  useEffect(() => {
    if (editData.Skills) {
      if (editData.Skills.parentId) {
        setCanTags2(editData.Skills.name)
        const curItem = skill.find(res => res.id === editData.Skills.parentId)
        setCanTags(curItem.name)
      } else {
        setCanTags(editData.Skills.name)
      }
    }
    return () => {}
  }, [editData])

  const showName = (list, id) => {
    const ab = list.find(item => {
      return item.id === id
    })
    return ab ? ab.userAliasName : ''
  }

  const openWin = url => {
    if (url.indexOf('.pdf') !== -1) {
      localStorage.setItem('file', url)
      window.open(`${baseURI}/candidate/preview`, 'new')
    } else {
      window.open(
        `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(url)}`,
        'new'
      )
    }
  }

  return (
    <div className="page-view">
      <HumBreadcrumb item={[{ name: '候选人', link: '/candidate' }, { name: '预览' }]} />
      <HumContainer className="view-container">
        <Button
          type="primary"
          className="recommend"
          onClick={() => {
            action.showModal(editData)
          }}
        >
          推荐项目
        </Button>
        <Tabs defaultActiveKey="1">
          <TabPane tab="基本信息" key="1">
            <Form className="addforms">
              <Row gutter={24}>
                <Col span={24} className="form-col">
                  <FormItem
                    className="add-basis100 form-uploader"
                    {...formItemLayout}
                    label="附件："
                  >
                    {editData.canAttachment && (
                      <span>
                        <Icon type="link" />
                        <a
                          onClick={e => {
                            e.stopPropagation()
                            openWin(editData.canAttachment)
                          }}
                        >
                          {decodeURIComponent(editData.canAttachment.split('document/')[1])}
                        </a>
                      </span>
                    )}
                  </FormItem>
                  <FormItem className="add-formitem" {...formItemLayout50} label="姓名">
                    {editData.canName}
                  </FormItem>

                  <FormItem className="add-formitem" {...formItemLayout50} label="英文姓名">
                    {editData.canEnName}
                  </FormItem>

                  <FormItem className="add-formitem" {...formItemLayout50} label="性别">
                    {editData.canSex}
                  </FormItem>

                  <FormItem className="add-formitem" label="年龄" {...formItemLayout50}>
                    {canBirthday}岁
                  </FormItem>

                  <FormItem className="add-formitem" {...formItemLayout50} label="所在城市">
                    {editData.canCity}
                  </FormItem>

                  <FormItem className="add-formitem" {...formItemLayout50} label="期望城市">
                    {editData.canLocal && JSON.parse(editData.canLocal).join(',')}
                  </FormItem>

                  <FormItem className="add-formitem" label="邮箱" {...formItemLayout50}>
                    {editData.canEmail}
                  </FormItem>

                  <FormItem className="add-formitem" label="手机" {...formItemLayout50}>
                    {editData.canPhone}
                  </FormItem>

                  <FormItem className="add-formitem" label="目前公司" {...formItemLayout50}>
                    {editData.canCompany}
                  </FormItem>

                  <FormItem className="add-formitem" label="职位" {...formItemLayout50}>
                    {editData.canPosition}
                  </FormItem>

                  <FormItem className="add-formitem" label="薪资" {...formItemLayout50}>
                    {editData.canSalary}
                  </FormItem>

                  <FormItem className="add-formitem" label="学历" {...formItemLayout50}>
                    {editData.canEducation}
                  </FormItem>

                  <FormItem className="add-basis100" label="技能" {...formItemLayout}>
                    {`${canTags}${canTags2 ? `-${canTags2}` : ''}`}
                  </FormItem>

                  {editData.OperationLog && editData.OperationLog.length ? (
                    <FormItem className="add-basis100" label="编辑记录" {...formItemLayout}>
                      <Collapse
                        defaultActiveKey={editData.OperationLog.map((item, index) => {
                          return index + ''
                        })}
                      >
                        {editData.OperationLog.map((item, index) => {
                          if (index > 10) {
                            return ''
                          }
                          return (
                            <Panel
                              header={`${showName(list.toJS(), item.lastUpdateUserId)} ${moment(
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
                    <Link to={`/candidate/add/${editData.id}`}>
                      <Button type="primary" style={{ marginLeft: '20px' }}>
                        编辑
                      </Button>
                    </Link>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </TabPane>
          <TabPane tab="项目" key="2">
            <DetailTable datatable={editData} action={action} />
          </TabPane>
        </Tabs>
      </HumContainer>
      <Detail
        modal={modal}
        action={action}
        callback={() => {
          action.queryById(id)
        }}
      />
    </div>
  )
}

export default Views
