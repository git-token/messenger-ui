import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Table
} from 'react-bootstrap'

import {
  ShowHelpMessage,
  ShowAccountDetailsTable
} from './index'

class ShowDataMessageComponent extends Component {
  constructor(options) {
    super(options)
  }

  componentDidMount () {}



  render() {
    const { gittoken: { messenger: { cmdData } }, cmd, data } = this.props

    if (!data && !cmd || !data.event && !cmd) {
      return null
    } else {
      console.log('data.event', data.event)
      switch(data.event) {
        case 'accountDetails':
          return <ShowAccountDetailsTable data={data} />
          break;
        default:
          if (!cmd || !cmdData[cmd]) {
            return null
          } else if (cmd.match(RegExp('/help'))) {
            return <ShowHelpMessage data={cmdData[cmd]} cmd={cmd} />
            break;
          } else {
            return null
          }
      }
    }
  }

}

const mapStoreToProps = (store, props) => {
  return {
    gittoken: store.gittoken
  }
}

const ShowDataMessage = connect(mapStoreToProps)(ShowDataMessageComponent)

export default ShowDataMessage
