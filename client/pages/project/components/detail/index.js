import './index.less'
import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, message, Select } from 'antd'

const Option = Select.Option

const projectStatus = [
  {
    label: 'Active',
    id: 0
  },
  {
    label: 'Pending',
    id: 1
  },
  {
    label: 'Complete',
    id: 2
  },
  {
    label: 'Close',
    id: 3
  }
]

@Form.create()
class DetailForm extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    proList: PropTypes.array,
    action: PropTypes.object,
    currentRecord: PropTypes.object.isRequired
  }

  componentDidMount() {}

  renderOptions = options => {
    return options.map((item, idx) => {
      return (
        <Option key={item.id} value={item.id}>
          {item.label}
        </Option>
      )
    })
  }

  render() {
    const { form, currentRecord } = this.props

    const { getFieldDecorator } = form

    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 }
    }
    return (
      <Form>
        <Form.Item {...formItemLayout} label="项目">
          {currentRecord.proName}
        </Form.Item>

        <Form.Item {...formItemLayout} label="状态：">
          {getFieldDecorator('proStatus', {
            initialValue: Number(currentRecord.proStatus) || 0,
            rules: [{ required: true, message: '请选择状态' }]
          })(<Select>{this.renderOptions(projectStatus)}</Select>)}
        </Form.Item>
      </Form>
    )
  }
}

export default class Detail extends React.Component {
  static propTypes = {
    modal: PropTypes.object.isRequired,
    callback: PropTypes.func,
    action: PropTypes.object.isRequired
  }

  onSubmit = e => {
    const { modal, action, callback } = this.props
    const { currentRecord } = modal

    this.refs.form.validateFields((errors, data) => {
      if (!errors) {
        let temp = {}
        temp = {
          ...currentRecord,
          ...data
        }
        action.save(temp).then(() => {
          action.hideModal()
          message.success('更新成功！')
          callback && callback()
        })
      }
    })
  }

  render() {
    const { modal, action } = this.props
    const { currentRecord, loading, visible } = modal

    return (
      <Modal
        className="modal-form"
        title="更新状态"
        visible={visible}
        confirmLoading={loading}
        onOk={this.onSubmit}
        onCancel={action.hideModal}
        maskClosable
        destroyOnClose
      >
        <DetailForm ref="form" action={action} currentRecord={currentRecord} />
      </Modal>
    )
  }
}
