import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Modal, Button, Tabs, Tab
} from 'react-bootstrap'

// import {
//   SignTransaction, SignData, AccountInformation,
// } from './index'

class WalletComponent extends Component {
  constructor(options) {
    super(options)
  }

  componentDidMount () {

  }

  toggleWalletModal () {
    const { dispatch, Wallet: { showModal } } = this.props
    console.log('toggleWalletModal::showModal', showModal)
    dispatch({ type: 'TOGGLE_WALLET_MODAL', value: !showModal })

  }

  selectView (view) {
    const { dispatch } = this.props
    dispatch({ type: 'SET_WALLET_VIEW', value: view })
  }

  render() {
    const { Wallet: { showModal, activeView } } = this.props
    return (
      <Modal show={showModal} bsSize={'lg'} onHide={this.toggleWalletModal.bind(this)}>
        <Modal.Header closeButton>
          <h3>Wallet</h3>
          <Tabs activeKey={activeView} onSelect={this.selectView.bind(this)} id="set-Wallet-view">
            <Tab eventKey={'SignData'} title="Sign Data">
              <br/><p>Sign Data</p>
            </Tab>
          </Tabs>
        </Modal.Header>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    )
  }

}

const mapStoreToProps = (store, props) => {
  return {
    Wallet: store.Wallet
  }
}

const Wallet = connect(mapStoreToProps)(WalletComponent)

export default Wallet
