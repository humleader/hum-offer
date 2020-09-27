import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Add from 'pages/project/page/add'
import List from 'pages/project/page/list'
import View from 'pages/project/page/view'

class Company extends Component {
  render() {
    return (
      <Switch>
        <Route exact component={Add} path="/project/add" />
        <Route exact component={Add} path="/project/add/:id" />
        <Route exact component={View} path="/project/view/:id" />
        <Route component={List} path="/" />
      </Switch>
    )
  }
}
export default Company
