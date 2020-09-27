import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Add from 'pages/company/page/add'
import List from 'pages/company/page/list'
import View from 'pages/company/page/view'

class Company extends Component {
  render() {
    return (
      <Switch>
        <Route exact component={Add} path="/company/add" />
        <Route exact component={Add} path="/company/add/:id" />
        <Route exact component={View} path="/company/view/:id" />
        <Route component={List} path="/" />
      </Switch>
    )
  }
}
export default Company
