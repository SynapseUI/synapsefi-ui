import React from 'react';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';

import Colors from '../../../colors';

const StyledDropdownContent = styled.div`
  width: inherit;

  margin-top: ${props => props.verticalOffset ? 'calc(props.verticalOffset - 40px)': '-40px'};

  position: absolute;
  display: block;
  visibility: hidden;

  background-color: ${Colors.WHITE};

  overflow-y: hidden;
  overflow-x: hidden;

  visibility: ${props => props.showContent && 'visible'};
  box-shadow: ${props => props.showContent && '0 1px 3px 0 rgba(0, 0, 0, 0.5)'};

  z-index: 2;
`;

const DropdownContent = (props) => {
  const {
    children,
    showContent,
    style,
    verticalOffset
  } = props;

  return (
    <StyledDropdownContent
      style={style}
      showContent={showContent}
      verticalOffset={verticalOffset}>
      {children}
    </StyledDropdownContent>
  );
}

export default DropdownContent;