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
      title: '姓名',
      width: '80px',
      dataIndex: 'canName'
    },
    {
      title: '目前公司',
      dataIndex: 'canCompany',
      width: '180px'
    },
    {
      title: '目前职位',
      dataIndex: 'canPosition'
    },
    {
      title: '薪资',
      dataIndex: 'canSalary'
    },
    {
      title: '城市',
      dataIndex: 'canCity'
    },
    {
      title: '年龄',
      dataIndex: 'canBirthday',
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
      title: '手机',
      dataIndex: 'canPhone'
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
        item.canName = record.canName
        item.proId = datatable.id
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
        history.push(`/candidate/view/${record.id}`)
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
        dataSource={datatable.Candidate}
      />
    )
  }
}
