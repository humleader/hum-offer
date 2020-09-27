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
import DotStatus from 'components/dot-status'
import Detail from './detail'

const statusMap = [
  {
    label: 'Active',
    value: 0,
    color: '#357BFF'
  },
  {
    label: 'Pending',
    value: 1,
    color: '#ff7000'
  },
  {
    label: 'Complete',
    value: 2,
    color: '#07C790'
  },
  {
    label: 'Close',
    value: 3,
    color: '#999'
  }
]

const QueryList = props => {
  const { company, action, common, project } = props

  const listSource = project.get('listSource').toJS()
  const params = project.get('params').toJS()
  let historyParams = project.get('historyParams')
  historyParams = historyParams && historyParams.toJS()
  const userList = common.get('list').toJS()
  const { modalStatus } = project.toJS()
  const toproject = company.get('toproject')

  const [backParams, setBackParams] = useState({})

  useEffect(() => {
    if (historyParams) {
      setBackParams(historyParams)
      action.setHistoryParams(undefined)
    }
    action.queryToproject()
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

  const showCompanyName = id => {
    const list = toproject.toJS()
    const ab = list.find(item => {
      return item.id === Number(id)
    })
    return ab ? ab.companyName : ''
  }

  const columns = [
    {
      title: '项目名称',
      fixed: 'left',
      dataIndex: 'proName',
      render: item => {
        return (
          <Tooltip placement="topLeft" title={item}>
            <div className="overflow-ellipsis">{item}</div>
          </Tooltip>
        )
      }
    },
    {
      title: '公司',
      dataIndex: 'proCompany',
      fixed: 'left',
      render: item => {
        return (
          <Tooltip placement="topLeft" title={showCompanyName(item)}>
            <div className="overflow-ellipsis">{showCompanyName(item)}</div>
          </Tooltip>
        )
      }
    },
    {
      title: '城市',
      width: '100px',
      dataIndex: 'proCity',
      render: item => {
        const city = JSON.parse(item)
        return city.join(',')
      }
    },
    {
      title: '保证期',
      width: '80px',
      dataIndex: 'proGuarantee'
    },
    {
      title: '收费',
      width: '100px',
      dataIndex: 'proBilling'
    },
    {
      title: '薪资',
      width: '100px',
      dataIndex: 'proSalary'
    },
    {
      title: 'HC',
      width: '80px',
      dataIndex: 'proHc'
    },
    {
      title: '简历沟通',
      width: '90px',
      render: item => {
        const len = item.ProAss
        return len && len.length ? len.length : 0
      }
    },
    {
      title: '简历推荐',
      width: '90px',
      render: item => {
        const len = item.ProAss.filter(i => {
          return i.status !== 4
        })
        return len && len.length ? len.length : 0
      }
    },
    {
      title: '面试',
      width: '70px',
      render: item => {
        const len = item.ProAss.filter(i => {
          return i.status === 1
        })
        return len && len.length ? len.length : 0
      }
    },
    {
      title: 'offer',
      width: '70px',
      render: item => {
        const len = item.ProAss.filter(i => {
          return i.status === 2
        })
        return len && len.length ? len.length : 0
      }
    },
    {
      title: '入职',
      width: '70px',
      render: item => {
        const len = item.ProAss.filter(i => {
          return i.status === 3
        })
        return len && len.length ? len.length : 0
      }
    },
    {
      title: '状态',
      dataIndex: 'proStatus',
      width: '120px',
      render: item => {
        const { color, label } = statusMap[item]

        return <DotStatus color={color} text={label} />
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
      title: '修改人',
      dataIndex: 'lastUpdateUserId',
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
      width: '140px',
      fixed: 'right',
      render: (text, record) => {
        return (
          <span>
            <a
              href="javascript:;"
              onClick={e => {
                e.stopPropagation()
                action.setHistoryParams(backParams)
                history.push(`/project/add/${record.id}`)
              }}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <a
              href="javascript:;"
              onClick={e => {
                e.stopPropagation()
                action.showModal(record)
              }}
            >
              更新状态
            </a>
          </span>
        )
      }
    }
  ]
  const formFields = [
    {
      title: '项目名称',
      type: 'input',
      placeholder: '项目名称',
      dataIndex: 'proName',
      formOptions: {
        initialValue: backParams.proName
      }
    },
    {
      title: '城市',
      type: 'input',
      placeholder: '城市',
      dataIndex: 'proCity',
      formOptions: {
        initialValue: backParams.proCity
      }
    },
    {
      title: '状态',
      type: 'select',
      placeholder: '选择状态',
      options: [
        {
          label: '全部',
          value: -1
        },
        {
          label: 'Active',
          value: 0
        },
        {
          label: 'Pending',
          value: 1
        },
        {
          label: 'Complete',
          value: 2
        }
      ],
      dataIndex: 'proStatus',
      formOptions: {
        initialValue: backParams.proStatus
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
        history.push(`/project/view/${record.id}`)
      }
    }
  }

  return (
    <div className="page-project">
      <HumBreadcrumb item="项目管理" />
      <HumContainer className="project-container">
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
                <Link to="/project/add">新增</Link>
              </Button>
            </ToolBar>
          }
          xTable={{
            columns,
            onRow: onRowClick,
            scroll: { x: 1840 },
            dataSource: listSource
          }}
        />
      </HumContainer>
      <Detail modal={modalStatus} action={action} callback={query} />
    </div>
  )
}

export default QueryList
