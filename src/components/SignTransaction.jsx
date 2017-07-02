import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Panel
} from 'react-bootstrap'

class SignTransactionComponent extends Component {
  constructor(options) {
    super(options)
  }

  componentDidMount () {}

  render() {
    const { Wallet } = this.props
    return (
      <Panel>
        <p>SignTransaction</p>
      </Panel>
    )
  }

}

const mapStoreToProps = (store, props) => {
  return {
    Wallet: store.Wallet
  }
}

const SignTransaction = connect(mapStoreToProps)(SignTransactionComponent)

export default SignTransaction
