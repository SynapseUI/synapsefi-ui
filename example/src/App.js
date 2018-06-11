import React from 'react';
import styled from 'styled-components';

import ExampleModalBasic from '../src/components/ExampleModalBasic';
import ExModalBtns from '../src/components/ExModalBtns';
import ExButtonGroup from './components/ExButtonGroup';
import ExampleForm from '../src/components/ExampleForm';
import AlertMessage from '../../src/components/AlertMessage/AlertMessage';

const Main = styled.div`
  font-family: "Roboto";
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
      hide: true
    };
  }

  render() {
    return (
      <Main>
        <p>Testing App Component</p>
        {/* <ExampleModalBasic /> */}
        {/* <ExModalBtns /> */}
        {/* <ExButtonGroup /> */}
        <ExampleForm />
        <AlertMessage 
          hide={this.state.hide}
          message='Test Msg: The quick brown fox jumped over the lazy dog'
          pageLevel
          onClose={() => this.setState({hide:true})}
          // warning={true}
          error={true}
          // success={true}
        />
      </Main>
    );
  }
}

export default App;
