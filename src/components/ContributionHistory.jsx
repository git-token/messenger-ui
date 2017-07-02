import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Col, Well, Table
} from 'react-bootstrap'

import { watchContributions } from '../actions/index'
import { ContributionsChart } from './index'

class ContributionHistoryComponent extends Component {
  constructor(options) {
      super(options)
  }

  componentDidMount() {
    const { dispatch, gittoken: { contributorAddress } } = this.props
    dispatch( watchContributions(contributorAddress) )
  }

  renderContributions() {
    const { gittoken: { contributions } } = this.props
    // console.log('renderContributions::contributions', contributions)
    return Object.keys(contributions).map((contribution, i) => {
      const { args: { value, contributor, rewardType } } = contributions[contribution]
      return (
        <tr key={i}>
          <td>{contributor}</td>
          <td>{value.toNumber()}</td>
          <td>{rewardType}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <Col sm={12}>
        <Col sm={12}>
          <h3>Contribution History</h3>
          <hr/>
        </Col>
        <Col sm={12}>
          <Table hover responsive>
            <thead>
              <tr>
                <th>Contributor</th>
                <th>Reward Value</th>
                <th>Reward Type</th>
              </tr>
            </thead>
            <tbody>
              {this.renderContributions()}
            </tbody>
          </Table>
        </Col>
      </Col>
    )
  }
}

const mapStoreToProps = (store, props) => {
  return {
    gittoken: store.gittoken
  }
}

const ContributionHistory = connect(mapStoreToProps)(ContributionHistoryComponent)

export default ContributionHistory
