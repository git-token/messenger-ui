import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Grid,
  Row,
  Col,
  Well,
  Button,
  ButtonGroup,
  Table
} from 'react-bootstrap'

import {
  SideNav,
  Wallet,
  ContributionHistory,
  ContributionsChart,
  TokenExchange,
  Messenger
} from './index'

import {
  openSocketConnection,
  retrieveKeystore
} from '../actions/index'

class DashboardComponent extends React.Component {
  constructor(options) {
    super(options)
  }

  componentDidMount() {
    const { dispatch, gittoken: { messenger: { messages } } } = this.props
    dispatch(openSocketConnection())
    dispatch(retrieveKeystore({ messages }))
  }

  render () {
    const { dispatch, main: { title }, wallet: { showModal } } = this.props;

    return (
      <div>
        <Row>
          <Col sm={3} />
          <Col sm={6} >
            <br/>
            <br/>
            <Messenger />
            <Wallet />
          </Col>
          <Col sm={3} />
        </Row>
      </div>
    )
  }

}

const mapStoreToProps = (store, props) => {
  return {
    gittoken: store.gittoken,
    main: store.main,
    wallet: store.Wallet
  }
}

const Dashboard = connect(mapStoreToProps)(DashboardComponent)

export default Dashboard
