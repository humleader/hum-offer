import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HumContainer from 'components/hum-container'
import HumBreadcrumb from 'components/hum-breadcrumb'

import './index.less'

import FormAdd from '../form-add'
import FormEdit from '../form-edit'

class Add extends Component {
  static propTypes = {
    match: PropTypes.object,
    company: PropTypes.object,
    common: PropTypes.object,
    action: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { match } = this.props
    const { id } = match.params || {}
    const { queryById } = this.props.action
    if (id) {
      queryById(match.params.id)
    }
  }

  render() {
    const { match, company, action, common } = this.props
    const { id } = match.params || ''
    const regionsDate = common.get('regionsDate')
    const userList = common.get('list')

    return (
      <div className="page-add">
        <HumBreadcrumb
          item={[{ name: '客户管理', link: '/company' }, { name: id ? '编辑' : '新增' }]}
        />
        <HumContainer>
          {id ? (
            <FormEdit
              company={company}
              regionsDate={regionsDate}
              userList={userList}
              action={action}
            />
          ) : (
            <FormAdd regionsDate={regionsDate} userList={userList} action={action} />
          )}
        </HumContainer>
      </div>
    )
  }
}

export default Add
