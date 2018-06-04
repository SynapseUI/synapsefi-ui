import React from 'react';
import styled from 'styled-components';
import ExampleModalBasic from '../src/components/ExampleModalBasic';

const Main = styled.div`
  font-family: Roboto;

  & > * {
    padding: 32px 16px;
  }
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
    };
  }

  render() {
    return (
      <Main>
        <p>Testing App Component</p>
        <ExampleModalBasic />
      </Main>
    );
  }
}

export default App;
