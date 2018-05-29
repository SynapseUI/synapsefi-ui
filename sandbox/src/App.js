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

    }
  }

  render(){
    return (
      <Main>
        <p>Testing App Component</p>

        <Input
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
          label="Name"
        />

        <Textarea
          value={this.state.description}
          onChange={(e) => this.setState({ description: e.target.value })}
          label="Description"
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

        <Dropdown
          searchable
          value={this.state.airport}
          onChange={(e, value) => this.setState({ airport: value })}
          label="Airport"
          options={[
            { key: 'SFO', text: 'San Francisco' },
            { key: 'JFK', text: 'John F. Kennedy Airport' },
            { key: 'ORD', text: 'O\'Hare International Airport' }
          ]}
        />
      </Main>
    )
  }
}

export default App;