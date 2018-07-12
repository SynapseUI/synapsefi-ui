import React from 'react';
import _ from 'lodash';
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
import CustomFooter from './components/CustomFooter';

import Colors from '../../src/colors';

import dataForForm from './data/FormApp.data';
import countriesOptions from './data/countriesOptions'

const Main = styled.div`
  .main-form {

    box-sizing: border-box;
    font-family: Roboto;
  
    & > * {
      padding: 32px 16px;
      border-bottom: 1px solid ${Colors.SILK_WHITE}
    }
  }

  .test-input-row {
    padding: 2rem 0rem;

    color: blue;
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
      from_node: '',
      description: '',

      isLoading: false,
      test: ''

      // showExampleDropdown: false

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleErrorCheck = this.handleErrorCheck.bind(this);
    this.updateField = this.updateField.bind(this);
    this.getDisabledCollection = this.getDisabledCollection.bind(this);
  }

  getDisabledCollection(){
    let result = {};

    if (this.state.username === 'asdf'){
      result['email'] = true;
    }

    return result;
  }

  getHiddenCollection(){
    let result = {};

    if (this.state.email === 'test2@email.com'){
      result['website'] = true;
    }

    return result;
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

    Object.keys(_.omit(this.state, ['isLoading'])).forEach((item) => {
      if(_.isEmpty(this.state[item])) errors[item] = "Field is required";
    })
    
    return errors;
  }

  handleSubmit(e){
    if (e) e.preventDefault();

    this.setState({ isLoading: true });

    setTimeout(() => {
      console.log('Submiting this.state in FormApp', this.state);
      this.setState({ isLoading: false });
    }, 2000);
  }

  render(){    
    return (
      <Main>
        <Form
          data={dataForForm}
          formClassName='main-form'
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
          disabledCollection={this.getDisabledCollection()}
          hiddenCollection={this.getHiddenCollection()}
          // onChangeCollection={{
          //   default: this.updateField
          // }}

          // customFooter={<CustomFooter/>}
          isLoading={this.state.isLoading}
        >

          <Dropdown
            key="test-dropdown"
            // multiselect
            searchable
            value={this.state.from_node}
            onChange={this.updateField}
            // options={[
            //   { key: 'DEPOSIT-US', text: 'Deposit' },
            //   { key: 'SUBNET', text: 'Subnet' },
            //   { key: 'CARD-US', text: 'card' },
            // ]}
            options={countriesOptions}
            propName='from_node'
            placeholder='Node'
            label='From Node'
          />
        </Form>
      </Main>
    )
  }
}

export default FormApp;