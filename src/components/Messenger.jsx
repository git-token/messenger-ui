import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Row, Col, FormGroup, FormControl, HelpBlock, ControlLabel,
  Button, Well, Panel, DropdownButton, MenuItem, InputGroup,
  Tabs, Tab, Table
} from 'react-bootstrap'

import {
  ShowDataMessage,
  ContributionsChart
} from './index'

import {
  sendMessage
} from '../actions/index'

class MessengerComponent extends Component {
  constructor(options) {
    super(options)
  }

  componentDidMount () {}

  FieldGroup({ id, label, help, submit, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <InputGroup>
          <DropdownButton
            bsStyle={'primary'}
            componentClass={InputGroup.Button}
            id="input-dropdown-addon"
            title="Options"
          >
            <MenuItem key="1">Export Keystore</MenuItem>
            <MenuItem key="2">Import Keystore</MenuItem>
            <MenuItem key="3">Contract Settings</MenuItem>
          </DropdownButton>
          <FormControl {...props} />
          <InputGroup.Button>
            <Button bsStyle={'default'} onClick={submit.bind(this)} >Send</Button>
          </InputGroup.Button>
        </InputGroup>
        {/*<FormControl.Feedback />*/}
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

  submitInput(evt) {
    evt.preventDefault()
    const { dispatch, gittoken: { contributorAddress, messenger: { activeTopic, input, messages, data } } } = this.props

    dispatch(sendMessage({ messages, input, activeTopic, contributorAddress, data }))
  }

  setForm(evt) {
    evt.preventDefault()
    const { dispatch } = this.props
    const { id, value } = evt.target
    // console.log('setForm::id, value', id, value)
    dispatch({ type: 'UPDATE_MESSENGER', id, value })
  }

  showMessages () {
    const { gittoken: { messenger: { activeTopic, messages } } } = this.props
    return messages.filter((message) => {
      const { topic } = message
      return topic == activeTopic
    }).sort((a, b) => {
      let dateA = new Date(a.date).getTime()
      let dateB = new Date(b.date).getTime()
      return dateA - dateB
    }).map((message, i) => {
      const { contributor, date, msg, data, cmd } = message
      // console.log('cmd', cmd)
      return (
        <div key={i}>
          <h5><strong>{contributor}</strong> | <small>{new Date(date).toString()}</small></h5>
          <p>{msg}</p>
          <ShowDataMessage cmd={cmd} data={data} />
        </div>
      )
    })
  }

  showTabs () {
    const { gittoken: { isContributor, verified, messenger: { activeTopic, topics } } } = this.props

    let scroll = (_element) => {
      if (_element) {
        _element.scrollTop = 600
      }
    }

    return topics.filter((topic) => {
      if (topic == 'account' || verified && isContributor) {
        return true
      } else if (
        topic == 'contributions' &&
        verified && !isContributor
      ) {
        return true
      }
    }).map((topic, i) => {
      return (
        <Tab eventKey={topic} title={topic} key={i}>
        <br/>
        <div
          ref={(element) => scroll(element)} style={{
              height: '600px',
              overflow: 'auto'
            }}>
            <br/>
            { topic != 'contributions' ? null : <ContributionsChart />}
            {this.showMessages(topic)}
          </div>
        </Tab>
      )
    })
  }

  render() {
    const { dispatch, wallet, gittoken } = this.props
    const { messenger, email, contributorAddress } = gittoken
    const { activeTopic, input, inputType, placeholder } = messenger

    return (
      <Col sm={12}>
        <Col sm={12}>
          <div>
            <Tabs activeKey={activeTopic}
              onSelect={(id) => dispatch({ type: 'UPDATE_MESSENGER', id: 'activeTopic', value: id })}
              id="set-messenger-view">
                {this.showTabs()}
            </Tabs>
            <br/>
            <br/>
          <form
            id={'input-field'}
            className={'form-horizontal'}
            style={{marginBottom: '-30px'}}
            onSubmit={this.submitInput.bind(this)}>
              {
                this.FieldGroup({
                id: 'input',
                label: null,
                value: input,
                type: inputType,
                placeholder: placeholder,
                help: null,
                onChange: this.setForm.bind(this),
                submit: this.submitInput.bind(this)
                })
              }
            </form>
          </div>
        </Col>
      </Col>
    )
  }

}

const mapStoreToProps = (store, props) => {
  return {
    wallet: store.Wallet,
    gittoken: store.gittoken
  }
}

const Messenger = connect(mapStoreToProps)(MessengerComponent)

export default Messenger
