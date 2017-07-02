import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  Row, Col, FormGroup, FormControl, HelpBlock, ControlLabel,
  Button
} from 'react-bootstrap'
import { authenticateEmail } from '../actions/index'

class LoginComponent extends Component {
  constructor(options) {
    super(options)
  }

  FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {/*<FormControl.Feedback />*/}
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

  setForm(evt) {
    const { dispatch } = this.props
    const { id, value } = evt.target
    console.log('setForm::id, value', id, value)
    dispatch({ type: 'SET_GITTOKEN_DETAILS', id, value })
  }

  render() {
    const { dispatch, gittoken: { email, isContributor } } = this.props
    if (isContributor) {
      return (<Redirect to="/dashboard" />)
    } else {
      return (
        <div>
          <Row>
            <Col sm={4}/>
            <Col sm={4}>
              <br/>
              <br/>
              <br/>
              <form className={'form-horizontal'}>
                {
                  this.FieldGroup({
                  id: 'email',
                  label: 'Enter Email Address',
                  value: email,
                  type: 'text',
                  placeholder: 'Enter Email',
                  help: 'Please Enter Email Address Associated with Git profile; e.g. my@email.com',
                  onChange: this.setForm.bind(this)
                  })
                }
              </form>
              <Button
                bsSize={'lg'}
                bsStyle={'primary'}
                block
                disabled={ !email.length ? true : false }
                onClick={() => dispatch(authenticateEmail(email)) }>Login</Button>
            </Col>
            <Col sm={4}/>
          </Row>
        </div>
      )
    }
  }
}


const mapStoreToProps = (store, props) => {
  return {
    gittoken: store.gittoken
  }
}

const Login = connect(mapStoreToProps)(LoginComponent)

export default Login;
