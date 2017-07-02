import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Col, Button, Table
} from 'react-bootstrap'

import {
  ContributionsChart
} from './index'

class TokenExchangeComponent extends Component {
  constructor(options) {
    super(options)
  }

  componentDidMount () {}

  render() {
    const { wallet } = this.props
    return (
      <Col sm={12}>
        <Col sm={12}>
          <h3>Exchange Token</h3>
          <hr/>
        </Col>
        <Col sm={6}>
          <div style={{height: 400}}>
            <ContributionsChart />
          </div>
          <hr/>
        <div style={{height: 200}}>
            <Button bsSize={'lg'} bsStyle={'primary'} block>SUBMIT</Button>
          </div>
        </Col>
        <Col sm={6}>
          <div style={{height: 300}}>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>BID QTY</th>
                  <th>PRICE</th>
                  <th>ASK QTY</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10000</td>
                  <td>1.00</td>
                  <td>30000</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <hr/>
          <div style={{height: 300}}>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Export</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{new Date().getTime()}</td>
                  <td>1.00</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Col>
    )
  }

}

const mapStoreToProps = (store, props) => {
  return {
    wallet: store.Wallet
  }
}

const TokenExchange = connect(mapStoreToProps)(TokenExchangeComponent)

export default TokenExchange
