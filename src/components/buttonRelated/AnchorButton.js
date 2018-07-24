import React from 'react';
import styled, { css } from 'styled-components';
import colors from '../../colors';

const primaryColor = `
  color:  ${colors.TEAL}
  fill:  ${colors.TEAL}
  &:hover {
    color: ${colors.DARK_TEAL};
    fill: ${colors.DARK_TEAL};
  }
  &:active {
    color: ${colors.DEEP_TEAL};
    fill: ${colors.DEEP_TEAL};
  }
`;

const tertiaryColor = `
  color:  ${colors.MEDIUM_GRAY}
  fill:  ${colors.MEDIUM_GRAY}
  &:hover {
    color: ${colors.EVENING};
    fill: ${colors.EVENING};
  }
  &:active {
    color: ${colors.NIGHT};
    fill: ${colors.NIGHT};
  }
`;

const removeColor = `
  color:  ${colors.ENERGY}
  fill:  ${colors.ENERGY}
  &:hover {
    color: ${colors.DARK_ENERGY};
    fill: ${colors.DARK_ENERGY};
  }
  &:active {
    color: ${colors.DEEP_ENERGY};
    fill: ${colors.DEEP_ENERGY};
  }
`;

// -----------------------------------------------------------------------------------------
// ------------------------------------ Styled Components ----------------------------------
// -----------------------------------------------------------------------------------------
const Button = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;

  background-color: ${props => (props.backgroundColor ? props.backgroundColor : 'transparent')};
  font-size: ${props => (props.fontSize ? props.fontSize : '14px')};

  ${primaryColor};

  ${props => props.primary && css`${primaryColor};`};
  ${props => props.tertiary && css`${tertiaryColor};`};
  ${props => props.remove && css`${removeColor};`};

  color: ${props => props.color && props.color};
  &:hover {
    color: ${props => props.hoverColor && props.hoverColor};
  }
  &:active {
    color: ${props => props.activeColor && props.activeColor};
  }
`;

const ActionButton = props => {
  // -------------------------------------------------------------------------------------
  // ----------------------------------- Render ------------------------------------------
  // -------------------------------------------------------------------------------------
  return <Button {...props}>{props.text}</Button>;
};

export default ActionButton;
