import React, { Component } from 'react'
import PropTypes from 'prop-types'
import history from 'common/history'
import moment from 'moment'
import { Table } from 'antd'
import './index.less'

export default class List extends Component {
  static propTypes = {
    datatable: PropTypes.object,
    action: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      cardActionType: ''
    }
  }

  columns = [
    {
      title: '项目名称',
      width: '160px',
      dataIndex: 'proName'
    },
    {
      title: '城市',
      dataIndex: 'proCity',
      render: item => {
        const city = JSON.parse(item)
        return city.join(',')
      }
    },
    {
      title: '保证期',
      dataIndex: 'proGuarantee'
    },
    {
      title: '收费',
      dataIndex: 'proBilling'
    },
    {
      title: '薪资',
      dataIndex: 'proSalary'
    },
    {
      title: '面试',
      render: item => {
        const obj = { 0: '简历推荐', 1: '面试', 2: 'offer', 3: '入职', 4: '简历沟通' }
        return (
          <span className={`tags tag${item.ProCanAss.status}`}>{obj[item.ProCanAss.status]}</span>
        )
      }
    },
    {
      title: '更新时间',
      render: item => {
        return moment(item.ProCanAss.updateTime).format('YYYY-MM-DD')
      }
    },
    {
      title: '操作',
      key: 'action',
      width: '120px',
      fixed: 'right',
      render: (text, record) => {
        const { action, datatable } = this.props
        const item = {}
        item.canName = datatable.canName
        item.proId = record.id
        item.assId = record.ProCanAss.id
        item.status = record.ProCanAss.status
        return (
          <span>
            <a
              onClick={e => {
                e.stopPropagation()
                action.showModal(item)
              }}
            >
              更新状态
            </a>
          </span>
        )
      }
    }
  ]

  onRowClick = record => {
    return {
      onClick: () => {
        history.push(`/project/view/${record.id}`)
      }
    }
  }

  componentDidMount() {}

  render() {
    const { datatable } = this.props

    return (
      <Table
        rowKey="id"
        className="hum-table-list"
        onRow={this.onRowClick}
        scroll={{ x: 1200 }}
        columns={this.columns}
        dataSource={datatable.Project}
      />
    )
  }
}
