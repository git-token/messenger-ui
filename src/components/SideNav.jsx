import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ButtonGroup } from 'react-bootstrap'

class SideNavComponent extends Component {
  constructor(options) {
      super(options)
  }

  render() {
    const { dispatch, wallet: { showModal }, gittoken: { symbol, organization } } = this.props
    return (
      <div>
        <ButtonGroup vertical block>
          <Button bsSize={'lg'}>Exchange Tokens</Button>
          <Button bsSize={'lg'}>Contribution History</Button>
          <Button
            bsSize={'lg'}
            onClick={() =>
              dispatch({ type: 'TOGGLE_WALLET_MODAL', value: !showModal })
            }>
            Account
          </Button>
          <Button bsSize={'lg'}>Token Settings</Button>
        </ButtonGroup>
      </div>
    )
  }
}

const mapStoreToProps = (store, props) => {
  return {
    wallet: store.Wallet,
    gittoken: store.gittoken
  }
}

const SideNav = connect(mapStoreToProps)(SideNavComponent)

export default SideNav
