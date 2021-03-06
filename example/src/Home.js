import React, { Component } from 'react';

import styled from 'styled-components';

const FlexAlignButtons = styled.div`
  display: flex;
  justify-content: flex-start;

  button {
    margin-right: 8px;
  }
`;

import App from './App';
import FormApp from './FormApp';
import ExAnchorButtons from './components/ExAnchorButtons';
import ExButtonGroup from './components/ExButtonGroup';
import LoadingCube from '../../src/components/LoadingCube/LoadingCube';
import ExampleModalBasic from './components/ExampleModalBasic';
import SubModalContainer from './components/SubModalContainer';
import ExampleNumberInputs from './components/ExampleNumberInputs';

import { Button } from '../../src/index';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const pages = {
  app: {
    name: 'App',
    component: <App />,
  },
  form: {
    name: 'FormApp',
    component: <FormApp />,
  },
  anchorButtons: {
    name: 'Anchor Buttons',
    component: <ExAnchorButtons />,
  },
  buttonGroups: {
    name: 'Button Groups',
    component: <ExButtonGroup />,
  },
  loadingGroup: {
    name: 'Loading Groups',
    component: <LoadingCube color={getRandomColor()} />,
  },
  Modal: {
    name: 'Modal',
    component: <ExampleModalBasic />,
  },
  Modal: {
    name: 'Modal w submodal',
    component: <SubModalContainer />,
  },
  numberInput: {
    name: 'Number Inputs',
    component: <ExampleNumberInputs />,
  },
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 'app',
    };
  }
  render() {
    return (
      <div>
        <FlexAlignButtons>
          {Object.keys(pages).map((pageKey, idx) => {
            return (
              <Button
                key={pageKey}
                type="button"
                value={pageKey}
                onClick={() => this.setState({ currentPage: pageKey })}
              >
                {pages[pageKey].name}
              </Button>
            );
          })}
        </FlexAlignButtons>

        {pages[this.state.currentPage].component}
      </div>
    );
  }
}

export default Home;
