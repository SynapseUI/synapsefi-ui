import React from 'react';
import styled, { css } from 'styled-components';

import AnimateHeight from 'react-animate-height';


import * as SvgIcons from '../SvgIcons';
import Colors from '../../colors';

const StyledCheveron = styled(SvgIcons.cheveron)`
  width: 16px;
  height: 16px;
  
  fill: ${Colors.MEDIUM_GRAY};

  transition: all .5s;
  transform: rotate3d(1, 0, 0, 180deg);
  ${props => props.showContent && css`transform: rotate3d(1, 0, 0, 0);`}

`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  border-top: 1px solid ${Colors.WARM_LIGHT};
  border-bottom:  1px solid ${Colors.WARM_LIGHT};

  padding: 1rem 2rem;
`;

class Accordion extends React.Component {
  constructor(props){
    super(props);

    this.state = { showContent: this.props.showContent };

    this.toggleShowContent = this.toggleShowContent.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.showContent !== this.state.showContent) {
      this.setState({ showContent: nextProps.showContent });
    }
  }

  toggleShowContent() {
    this.setState({ showContent: !this.state.showContent });
  }

  render(){
    const {
      header,
      headerStyle,
      headerClassName,
      menuSpeed,
      children
    } = this.props;

    const { showContent } = this.state;

    return(
      <div>
        <Header onClick={ this.toggleShowContent } style={headerStyle} headerClassName={headerClassName}>
          { header }
          <StyledCheveron
            showContent={ showContent }
          />
        </Header>

        <AnimateHeight
          duration={ menuSpeed || 500 }
          height={ showContent ? 'auto' : 0 }
        >
          { children }
        </AnimateHeight>
      </div>
    )
  }
}

export default Accordion;