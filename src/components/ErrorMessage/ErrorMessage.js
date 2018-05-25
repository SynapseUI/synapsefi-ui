import React from 'react';
import styled, { css } from 'styled-components';

import { error } from '../SvgIcons';

const StyledErrorSign = styled(error)`
  height: 16px;
  width: 16px;
  margin-right: 8px;

  path:first-of-type {
    fill: var(--color-energy);
  }
`;

const FlexColumn__ErrorMessage = styled.span`
  align-items: center;
  color: var(--color-energy);
  display: flex;
  
  padding: 8px;

  margin-top: 36px;
  position: absolute;

  ${props => (props.alignedLeft && css`
    margin-top: 0px;
    position: relative;
  `)}
  
`;

const renderMessage = (error) => {
  if (error) {
    return [
      <StyledErrorSign key='StyledErrorSign'/>,
      <span key='ErrorSignText'>{error}</span>
    ];
  }

  return null;
};

const ErrorMessage = (props) => {
  const { error, alignedLeft } = props;
  if (error) {
    return (
      <FlexColumn__ErrorMessage alignedLeft={alignedLeft}>
        {renderMessage(error)}
      </FlexColumn__ErrorMessage>
    );
  }

  return null;
};

export default ErrorMessage;
