import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Table
} from 'react-bootstrap'

class ShowAccountsDetailsTableComponent extends Component {
  constructor(options) {
    super(options)
  }

  componentDidMount () {}

  showBody() {
    const { data: { table } } = this.props

    return table.map((item, i) => {
      const { type, value } = item
      return (
        <tr key={i}>
          <td>{type}</td>
        <td>{value}</td>
        </tr>
      )
    })
  }

  render() {
    console.log('render account details table')
    return (
      <Table hover responsive>
        <thead></thead>
        <tbody>
          {this.showBody()}
        </tbody>
      </Table>
    )
  }

}

const mapStoreToProps = (store, props) => {
  return {
    gittoken: store.gittoken
  }
}

const ShowAccountsDetailsTable = connect(mapStoreToProps)(ShowAccountsDetailsTableComponent)

export default ShowAccountsDetailsTable
