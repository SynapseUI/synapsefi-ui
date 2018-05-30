import React from 'react';
import styled from 'styled-components';

import {
  Input,
  Textarea,
  CheckboxGroup,
  RadioGroup,
  Dropdown
} from '../../src/index';

const Main = styled.div`
  font-family: Roboto;

  & > * {
    padding: 32px 16px;
  }
`;

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      description: '',
      switch: 'ON',
      pets: '',
      airport: ''
    }
  }

  render(){
    return (
      <Main>
        <p>Testing App Component</p>

        <Dropdown
          searchable
          value={this.state.airport}
          onChange={(e, value) => this.setState({ airport: value })}
          label="Airport"
          placeholder="Airport"
          options={[
            { key: 'SFO', text: 'San Francisco' },
            { key: 'JFK', text: 'John F. Kennedy Airport' },
            { key: 'ORD', text: 'O\'Hare International Airport' }
          ]}
        />

        <Input
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
          label="Name"
          placeholder="Name"
        />

        <Textarea
          value={this.state.description}
          onChange={(e) => this.setState({ description: e.target.value })}
          label="Description"
          placeholder="Description"
        />

        <RadioGroup
          value={this.state.switch}
          onChange={(e) => this.setState({ switch: e.target.value })}
          label="Light Switch"
          options={[
            { key: 'ON', text: 'On' },
            { key: 'OFF', text: 'Off' }
          ]}
        />

        <CheckboxGroup
          value={this.state.pets}
          onChange={(e, value) => this.setState({ pets: value })}
          label="Light Switch"
          options={[
            { key: 'CAT', text: 'Cat' },
            { key: 'DOG', text: 'Dog' }
          ]}
        />

        
      </Main>
    )
  }
}

export default App;