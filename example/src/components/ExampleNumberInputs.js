import React from 'react';
import styled from 'styled-components';

import { NumberInput } from '../../../src/index';
import Colors from '../../../src/colors';

const MainLayout = styled.div`
  & > * {
    padding: 32px 16px;
    border-bottom: 1px solid ${Colors.SILK_WHITE}
  }

  box-sizing: border-box;
  font-family: Roboto;

  display: flex;
  flex-direction: column;

  .custom-number-input {
    svg {
      display: none;
    }
  }
`;

class ExampleNumberInputs extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      phoneNumber: '',
      amount: '',
      date: ''
    }

    this.updateField = this.updateField.bind(this);
  }

  updateField(e, value, field) {
    if ((value || value === '') && field) {
      this.setState({ [field]: value });
    }
  }

  render(){
    return (
      <MainLayout>
        <NumberInput
          className="custom-number-input"
          propName="phoneNumber"
          value={this.state.phoneNumber}
          onChange={this.updateField}
          label="Phone Number"
          type="phone"
          error="I Am Error"
        />

        <NumberInput
          propName="amount"
          value={this.state.amount}
          onChange={this.updateField}
          label="Amount"
          type="currency"
        />

        <NumberInput
          propName="date"
          value={this.state.date}
          onChange={this.updateField}
          label="Date"
          type="date"
        />
      </MainLayout>
    )
  }
}

export default ExampleNumberInputs;