import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Table
} from 'react-bootstrap'

class ShowHelpMessageComponent extends Component {
  constructor(options) {
    super(options)
  }

  componentDidMount () {}

  showBody() {
    const { data } = this.props
    return data.map((datum, i) => {
      const { command, description, example } = datum
      return (
        <tr key={i}>
          <td>{command}</td>
          <td>{description}</td>
          <td><strong>{example}</strong></td>
        </tr>
      )
    })
  }

  render() {
    return (
      <Table hover responsive>
        <thead>
          <tr>
            <th>Command</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
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

const ShowHelpMessage = connect(mapStoreToProps)(ShowHelpMessageComponent)

export default ShowHelpMessage
