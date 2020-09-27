import React, { useEffect } from 'react'

import './index.less'

import HumContainer from 'components/hum-container'
import HumBreadcrumb from 'components/hum-breadcrumb'
import Detail from 'components/detail'

import FormAdd from '../form-add'

const Add = props => {
  const { match, action, candidate, common } = props
  const { id } = match.params || {}
  const regionsDate = common.get('regionsDate')
  const userList = common.get('list')
  const modal = common.get('modal')
  const skill = candidate.get('skill').toJS()

  useEffect(() => {
    action.getSkill()
    if (id) {
      action.queryById(id)
    }
    return () => {
      action.setEditData({})
    }
  }, [id])

  return (
    <div className="page-add">
      <HumBreadcrumb
        item={[{ name: '候选人', link: '/candidate' }, { name: id ? '编辑' : '新增' }]}
      />
      <HumContainer className="add-container">
        <FormAdd
          candidate={candidate}
          user={userList}
          regionsDate={regionsDate}
          skill={skill}
          action={action}
        />
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

export default Add
