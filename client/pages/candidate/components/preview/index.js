import React, { Component } from 'react'
import './index.less'

class Preview extends Component {
  static propTypes = {}
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    const fileurl = localStorage.getItem('file')

    return <iframe src={fileurl} width="100%" height="100%" frameBorder="1" />
  }
}

export default Preview
