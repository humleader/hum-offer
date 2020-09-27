import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Divider, Tooltip, Button } from 'antd'
import { Link } from 'react-router-dom'

import './index.less'
import history from 'common/history'

import HumContainer from 'components/hum-container'
import HumBreadcrumb from 'components/hum-breadcrumb'
import HumQuery from 'components/hum-query'
import ToolBar from 'components/tool-bar'
import Detail from 'components/detail'

const QueryList = props => {
  const { candidate, action, common } = props
  const listSource = candidate.get('listSource').toJS()
  const params = candidate.get('params').toJS()
  const skill = candidate.get('skill').toJS()
  let historyParams = candidate.get('historyParams')
  historyParams = historyParams && historyParams.toJS()
  const userList = common.get('list').toJS()
  const modal = common.get('modal')

  const [backParams, setBackParams] = useState({})

  useEffect(() => {
    action.getSkill()
    if (historyParams) {
      setBackParams(historyParams)
      action.setHistoryParams(undefined)
    }
    return () => {}
  }, [])

  const query = data => {
    setBackParams(data)
    return action.query(data)
  }

  const showName = id => {
    const list = userList
    const ab = list.find(item => {
      return item.id === Number(id)
    })
    return ab ? ab.userAliasName : ''
  }

  const columns = [
    {
      title: '姓名',
      width: '80px',
      dataIndex: 'canName',
      fixed: 'left'
    },
    {
      title: '英文名',
      width: '80px',
      dataIndex: 'canEnName',
      fixed: 'left'
    },
    {
      title: '手机',
      width: '140px',
      dataIndex: 'canPhone',
      fixed: 'left'
    },
    {
      title: '目前公司',
      dataIndex: 'canCompany',
      render: item => {
        return (
          <Tooltip placement="topLeft" title={item}>
            <div className="overflow-ellipsis">{item}</div>
          </Tooltip>
        )
      }
    },
    {
      title: '目前职位',
      dataIndex: 'canPosition'
    },
    {
      title: '薪资',
      width: '120px',
      dataIndex: 'canSalary'
    },
    {
      title: '城市',
      width: '120px',
      dataIndex: 'canCity'
    },
    {
      title: '年龄',
      dataIndex: 'canBirthday',
      width: '80px',
      render: item => {
        let age
        if (item && item.indexOf('-') !== -1) {
          const text = moment(item, 'YYYY-MM-DD').fromNow()
          age = parseInt(text, 10)
        } else {
          const text = moment(`${item}-12-31`, 'YYYY-MM-DD').fromNow()
          age = parseInt(text, 10)
        }
        if (isNaN(age)) {
          age = '未知'
        } else {
          age = age + '岁'
        }
        return age
      }
    },
    {
      title: '邮箱',
      dataIndex: 'canEmail'
    },
    {
      title: '学历',
      width: '80px',
      dataIndex: 'canEducation'
    },
    {
      title: '创建人',
      dataIndex: 'addUserId',
      width: '80px',
      render: item => {
        return showName(item)
      }
    },
    {
      title: '修改人',
      dataIndex: 'lastUpdateUserId',
      width: '80px',
      render: item => {
        return showName(item)
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: '120px',
      render: item => {
        return moment(item).format('YYYY-MM-DD')
      }
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      width: '120px',
      render: item => {
        return moment(item).format('YYYY-MM-DD')
      }
    },
    {
      title: '操作',
      key: 'action',
      width: '140px',
      fixed: 'right',
      render: (text, record) => {
        return (
          <span>
            <a
              onClick={e => {
                e.stopPropagation()
                action.setHistoryParams(backParams)
                history.push(`/candidate/add/${record.id}`)
              }}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <a
              onClick={e => {
                e.stopPropagation()
                action.showModal(record)
              }}
            >
              推荐项目
            </a>
          </span>
        )
      }
    }
  ]
  const formFields = [
    {
      title: '手机',
      type: 'input',
      placeholder: '输入手机',
      dataIndex: 'canPhone',
      formOptions: {
        initialValue: backParams.canPhone
      }
    },
    {
      title: '职位',
      type: 'input',
      placeholder: '输入职位',
      dataIndex: 'canPosition',
      formOptions: {
        initialValue: backParams.canPosition
      }
    },
    {
      title: '职业分类',
      type: 'select',
      placeholder: '职业分类',
      dataIndex: 'canTags',
      options: skill,
      formOptions: {
        initialValue: backParams.canTags
      }
    },
    {
      title: '创建人',
      type: 'select',
      placeholder: '请选择创建人',
      dataIndex: 'addUserId',
      options: userList.map(res => ({ label: res.userAliasName, value: res.id })),
      formOptions: {
        initialValue: backParams.addUserId
      }
    },
    {
      title: '姓名',
      type: 'input',
      placeholder: '输入姓名',
      dataIndex: 'canName',
      formOptions: {
        initialValue: backParams.canName
      }
    },
    {
      title: '所在城市',
      type: 'input',
      placeholder: '所在城市',
      dataIndex: 'canCity',
      formOptions: {
        initialValue: backParams.canCity
      }
    },
    {
      title: '目前公司',
      type: 'input',
      placeholder: '输入目前公司',
      dataIndex: 'canCompany',
      formOptions: {
        initialValue: backParams.canCompany
      }
    },
    {
      title: '创建时间',
      type: 'rangePicker',
      dataIndex: 'createTime',
      formOptions: {
        initialValue: backParams.createTime
      }
    }
  ]

  const onRowClick = record => {
    return {
      onClick: () => {
        action.setHistoryParams(backParams)
        history.push(`/candidate/view/${record.id}`)
      }
    }
  }

  return (
    <div className="page-candidate">
      <HumBreadcrumb item="候选人" />
      <HumContainer className="candidate-container">
        <HumQuery
          params={params}
          historyParams={historyParams}
          query={query}
          xForm={{
            formFields
          }}
          toolBar={
            <ToolBar>
              <Button type="primary">
                <Link to="/candidate/add">新增</Link>
              </Button>
            </ToolBar>
          }
          xTable={{
            columns,
            onRow: onRowClick,
            scroll: { x: 1800 },
            dataSource: listSource
          }}
        />
      </HumContainer>
      <Detail modal={modal} action={action} />
    </div>
  )
}

export default QueryList
