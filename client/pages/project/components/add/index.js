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
    project: PropTypes.object,
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
    const { queryById, queryToproject } = this.props.action
    if (id) {
      queryById(match.params.id)
    }
    queryToproject()
  }

  render() {
    const { match, project, company, common, action } = this.props
    const { id } = match.params || ''
    const regionsDate = common.get('regionsDate')

    return (
      <div className="page-add">
        <HumBreadcrumb
          item={[{ name: '项目管理', link: '/project' }, { name: id ? '编辑' : '新增' }]}
        />
        <HumContainer>
          {id ? (
            <FormEdit
              project={project}
              regionsDate={regionsDate}
              company={company}
              user={common}
              action={action}
            />
          ) : (
            <FormAdd regionsDate={regionsDate} company={company} action={action} />
          )}
        </HumContainer>
      </div>
    )
  }
}

export default Add
