import React from 'react';
import styled from 'styled-components';

import { Dropdown } from 'package';

import DisplayItem from './components/DisplayItem';

const Main = styled.div`
  font-family: "Roboto";
  & > * {
    padding: 32px 16px;
  }
`;

const DropdownItem = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      switch: 'ON',
      pets: '',
      airport: '',
      hide: true,
      from_node: ''
    };

    this.updateField = this.updateField.bind(this);
    this.displayItemInDropdown = this.displayItemInDropdown.bind(this);
  }

  updateField(e, value, field) {
    console.log('value: ', value);
    
    if ((value || value === '') && field){
      this.setState({ [field]: value})
    }
  }

  displayItemInDropdown(item){
    return(
      <DropdownItem>
        <p>{item.text}</p>
        <p>{item.key}</p>
        <p>Some Role i guess</p>
      </DropdownItem>
    )
  }

  render() {
    return (
      <Main>
        <Dropdown
          styles={{ width: '100%'}}
          // width="100%"
          key="test-dropdown"
          // multiselect
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

          displayComponent={DisplayItem}
        />
      </Main>
    );
  }
}

export default App;
