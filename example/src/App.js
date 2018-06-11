import React from 'react';
import styled from 'styled-components';

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
      hide: true,
    };
  }

  render() {
    return (
      <Main>
        <p>Testing App Component</p>
      </Main>
    );
  }
}

export default App;
