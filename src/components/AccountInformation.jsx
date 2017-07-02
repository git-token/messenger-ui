import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Panel
} from 'react-bootstrap'

class AccountInformationComponent extends Component {
  constructor(options) {
    super(options)
  }

  componentDidMount () {}

  render() {
    const { Wallet } = this.props
    return (
      <Panel>
        <p>AccountInformation</p>
      </Panel>
    )
  }

}

const mapStoreToProps = (store, props) => {
  return {
    Wallet: store.Wallet
  }
}

const AccountInformation = connect(mapStoreToProps)(AccountInformationComponent)

export default AccountInformation
