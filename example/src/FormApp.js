import React from 'react';
import styled from 'styled-components';

import {
  Form,
  Input,
  Textarea,
  Dropdown,
  Label
} from '../../src/index';

import DropdownHead from '../../src/components/Dropdown/components/DropdownHead'
import DropdownContent from '../../src/components/Dropdown/components/DropdownContent'

import Colors from '../../src/colors';

import dataForForm from './data/FormApp.data';

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
      from_node: [],

      showExampleDropdown: false

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
          // formClassName='main-form'
          formValues={this.state}
          handleSubmit={this.handleSubmit}
          submitButtonText="Custom Submit"
          additionalButtons={
            [
              {
                style: 'tertiary',
                text: 'Cancel',
                action: () => console.log('cancel')
              }
            ]
          }
          validation={this.handleErrorCheck}
          onChange={this.updateField}
          // onChangeCollection={{
          //   default: this.updateField
          // }}
        >

          <Dropdown
            key="test-dropdown"
            multiselect
            // searchable
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

          <DropdownHead onClick={() => this.setState({showExampleDropdown: !this.state.showExampleDropdown})}>
            <Label label="Example"/>
          </DropdownHead>

          <DropdownContent
            showContent={this.state.showExampleDropdown}
            verticalOffset='16px'
          >
            <p>Hi</p>
            <p>There</p>
          </DropdownContent>
          
        </Form>
      </Main>
    )
  }
}

export default FormApp;