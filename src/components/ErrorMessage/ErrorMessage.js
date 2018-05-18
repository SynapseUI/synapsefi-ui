import React from 'react';
import styled, { css } from 'styled-components';

// import { error } from '../common/svgIcons';

// const StyledErrorSign = styled(error)`
//   height: 1rem;
//   width: 1rem;
//   margin-right: 0.5rem;

//   path:first-child {
//     fill: var(--color-energy);
//   }
// `;

const FlexColumn__ErrorMessage = styled.span`
  align-items: center;
  color: var(--color-energy);
  display: flex;
  
  padding: 0.5rem;

  margin-top: 36px;
  position: absolute;

  ${props => (props.alignedLeft && css`
    margin-top: 0px;
    position: relative;
  `)}
  
`;

const renderMessage = (errorMessage) => {
  if (errorMessage) {
    return [
      // <StyledErrorSign key='StyledErrorSign'/>,
      <span key='StyledErrorSign-span'>{errorMessage}</span>
    ];
  }

  return null;
};

const ErrorMessage = (props) => {
  const { error, errorMessage, alignedLeft } = props;
  if (error) {
    return (
      <FlexColumn__ErrorMessage alignedLeft={alignedLeft}>
        {renderMessage(errorMessage)}
      </FlexColumn__ErrorMessage>
    );
  }

  return null;
};

export default ErrorMessage;
