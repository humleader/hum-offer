import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Tooltip, Button } from 'antd'
import { Link } from 'react-router-dom'

import './index.less'
import history from 'common/history'

import HumContainer from 'components/hum-container'
import HumBreadcrumb from 'components/hum-breadcrumb'
import HumQuery from 'components/hum-query'
import ToolBar from 'components/tool-bar'
import DotStatus from 'components/dot-status'

const companyMap = [
  {
    label: '普通公司',
    value: 0,
    color: '#357BFF'
  },
  {
    label: '开发中的客户',
    value: 1,
    color: '#ff7000'
  },
  {
    label: '已签约的客户',
    value: 2,
    color: '#07C790'
  },
  {
    label: '历史客户',
    value: 3,
    color: '#EF6555'
  }
]

const QueryList = props => {
  const { company, action, common } = props
  const listSource = company.get('listSource').toJS()
  const params = company.get('params').toJS()
  let historyParams = company.get('historyParams')
  historyParams = historyParams && historyParams.toJS()
  const userList = common.get('list').toJS()

  const [backParams, setBackParams] = useState({})

  useEffect(() => {
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
      title: '公司名称',
      dataIndex: 'companyName',
      render: item => {
        return (
          <Tooltip placement="topLeft" title={item}>
            <div className="overflow-ellipsis">{item}</div>
          </Tooltip>
        )
      }
    },
    {
      title: '城市',
      width: '80px',
      dataIndex: 'companyCity'
    },
    {
      title: '联系人',
      width: '80px',
      dataIndex: 'contactName'
    },
    {
      title: '联系人电话',
      width: '140px',
      dataIndex: 'contactTel'
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: '140px',
      render: item => {
        const { color, label } = companyMap[item]

        return <DotStatus color={color} text={label} />
      }
    },
    {
      title: '行业',
      width: '120px',
      dataIndex: 'companyIndustry'
    },
    {
      title: '英文名称',
      dataIndex: 'companyEnName',
      render: item => {
        return (
          <Tooltip placement="topLeft" title={item}>
            <div className="overflow-ellipsis">{item}</div>
          </Tooltip>
        )
      }
    },

    {
      title: 'BD',
      dataIndex: 'bdId',
      width: '80px',
      render: item => {
        return showName(item)
      }
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
      title: '更新时间',
      dataIndex: 'updateTime',
      width: '120px',
      render: updateTime => {
        return moment(updateTime).format('YYYY-MM-DD')
      }
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: '80px',
      render: (text, record) => (
        <span>
          <a
            href="javascript:;"
            onClick={e => {
              e.stopPropagation()
              action.setHistoryParams(backParams)
              history.push(`/company/add/${record.id}`)
            }}
          >
            编辑
          </a>
        </span>
      )
    }
  ]
  const formFields = [
    {
      title: '公司名称',
      type: 'input',
      placeholder: '公司名称',
      dataIndex: 'companyName',
      formOptions: {
        initialValue: backParams.companyName
      }
    },
    {
      title: '联系人',
      type: 'input',
      placeholder: '联系人',
      dataIndex: 'contactName',
      formOptions: {
        initialValue: backParams.contactName
      }
    },
    {
      title: '联系人电话',
      type: 'input',
      placeholder: '联系人电话',
      dataIndex: 'contactTel',
      formOptions: {
        initialValue: backParams.contactTel
      }
    },
    {
      title: '城市',
      type: 'input',
      placeholder: '城市',
      dataIndex: 'companyCity',
      formOptions: {
        initialValue: backParams.companyCity
      }
    },
    {
      title: '行业',
      type: 'input',
      placeholder: '行业',
      dataIndex: 'companyIndustry',
      formOptions: {
        initialValue: backParams.companyIndustry
      }
    },
    {
      title: '类型',
      type: 'select',
      placeholder: '选择类型',
      options: [
        {
          label: '全部',
          value: -1
        },
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
      ],
      dataIndex: 'type',
      formOptions: {
        initialValue: backParams.type
      }
    },
    {
      title: '更新时间',
      type: 'rangePicker',
      dataIndex: 'updateTime',
      formOptions: {
        initialValue: backParams.updateTime
      }
    }
  ]

  const onRowClick = record => {
    return {
      onClick: () => {
        action.setHistoryParams(backParams)
        history.push(`/company/view/${record.id}`)
      }
    }
  }

  return (
    <div className="page-company">
      <HumBreadcrumb item="客户管理" />
      <HumContainer className="company-container">
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
                <Link to="/company/add">新增</Link>
              </Button>
            </ToolBar>
          }
          xTable={{
            columns,
            onRow: onRowClick,
            scroll: { x: 1600 },
            dataSource: listSource
          }}
        />
      </HumContainer>
    </div>
  )
}

export default QueryList
