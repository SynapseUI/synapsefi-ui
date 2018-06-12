import React from 'react';
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

import { Button } from '../../src/index';

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
};

class Home extends React.Component {
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
