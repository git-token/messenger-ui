import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Panel
} from 'react-bootstrap'

class SignDataComponent extends Component {
  constructor(options) {
    super(options)
  }

  componentDidMount () {}

  render() {
    const { Wallet } = this.props
    return (
      <Panel>
        <p>SignData</p>
      </Panel>
    )
  }

}

const mapStoreToProps = (store, props) => {
  return {
    Wallet: store.Wallet
  }
}

const SignData = connect(mapStoreToProps)(SignDataComponent)

export default SignData
