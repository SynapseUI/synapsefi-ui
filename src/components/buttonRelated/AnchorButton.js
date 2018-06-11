import React from 'react';
import styled from 'styled-components';
import colors from '../../colors';

// -----------------------------------------------------------------------------------------
// ------------------------------------ Styled Components ----------------------------------
// -----------------------------------------------------------------------------------------
const Button = styled.button`
  border: none;
  cursor: pointer;
  outline: none;

  font-size: ${props => (props.fontSize ? props.fontSize : '14px')};
  color: ${props => (props.color ? props.color : colors.TEAL)};

  &:hover {
    color: ${props => (props.hoverColor ? props.hoverColor : colors.DARK_TEAL)};
  }

  &:active {
    color: ${props => (props.activeColor ? props.activeColor : colors.DEEP_TEAL)};
  }
`;

const ActionButton = props => {
  // -------------------------------------------------------------------------------------
  // ----------------------------------- Render ------------------------------------------
  // -------------------------------------------------------------------------------------
  return <Button {...props}>{props.text}</Button>;
};

export default ActionButton;
