import React from 'react';
import styled from 'styled-components';

import {
  Form,
  Input,
  Textarea,
  Dropdown
} from '../../src/index';

import Colors from '../../src/colors';

import dataForForm from './data/dataForForm';

const Main = styled.div`
  .main-form {

    box-sizing: border-box;
    font-family: Roboto;
  
    & > * {
      padding: 32px 16px;
      border-bottom: 1px solid ${Colors.SILK_WHITE}
    }
  }
`;

class FormApp extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      email: 'test@email.com',
      username: 'asdfasdf',
      website: 'http://www.localhost:8080/',
      // description: '',
      amount: '',
      user_permission: '',
      card_preferences: [],
      api_version: '',
      other_preference: '',
      from_node: '',
      compliance_notes: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleErrorCheck = this.handleErrorCheck.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  updateField(e, value, field) {
    console.log('value: ', value);
    
    if ((value || value === '') && field){
      this.setState({ [field]: value})
    }
  }

  handleErrorCheck(){
    let errors = {};

    if (this.state.email === 'test@email.com'){
      errors['email'] = "Input a real email address -_-"
    }

    Object.keys(this.state).forEach((item) => {
      if(_.isEmpty(this.state[item])) errors[item] = "Field is required";
    })
    
    return errors;
  }

  handleSubmit(e){
    if (e) e.preventDefault();
    console.log('Submiting this.state in FormApp', this.state);
  }

  render(){
    return (
      <Main>
        <Form
          data={dataForForm}
          formClassName='main-form'
          formValues={this.state}
          handleSubmit={this.handleSubmit}
          validation={this.handleErrorCheck}
          onChange={this.updateField}
          // onChangeCollection={{
          //   default: this.updateField
          // }}
        >
          <Input
            key="test-input"
            value={this.state.other_preference}
            onChange={e => this.setState({
              other_preference: e.target.value
            })}
            onBlur={() => console.log('blur')}
            onFocus={() => console.log('focus')}
            propName='other_preference'
            label='Other Preferences'
          />

          <Dropdown
            key="test-dropdown"
            value={this.state.from_node}
            onChange={this.updateField}
            options={[
              { key: 'DEPOSIT-US', text: 'Deposit' },
              { key: 'SUBNET', text: 'Subnet' },
              { key: 'CARD-US', text: 'card' },
            ]}
            propName='from_node'
            placeholder='Node'
            label='From Node'
          />

          <Textarea
            key="test-textarea"
            className='user-page-input-row'
            value={this.state.compliance_notes}
            onChange={e => this.setState({ compliance_notes: e.target.value })}
            propName='compliance_notes'
            label='Comppliance Notes'
            placeholder='Enter a Description'
            description='Enter a Description'
          />
        </Form>
      </Main>
    )
  }
}

export default FormApp;