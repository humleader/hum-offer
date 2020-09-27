import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Add from 'pages/candidate/page/add'
import List from 'pages/candidate/page/list'
import View from 'pages/candidate/page/view'
import Preview from './components/preview'

class Company extends Component {
  render() {
    return (
      <Switch>
        <Route exact component={Add} path="/candidate/add" />
        <Route exact component={Add} path="/candidate/add/:id" />
        <Route exact component={View} path="/candidate/view/:id" />
        <Route exact component={Preview} path="/candidate/preview" />
        <Route component={List} path="/" />
      </Switch>
    )
  }
}
export default Company
