import React from 'react';
import styled, { css } from 'styled-components';

import { error as errorIcon, check as successIcon, warning as warningIcon} from '../SvgIcons';
import Colors from '../../colors';

// -----------------------------------------------------------------------------------------
// ---------------------------------------- Common Style -----------------------------------
// -----------------------------------------------------------------------------------------

// const StyledAlertSign = styled(error)`

//   path:first-of-type {
//     ${props => props.error && css`fill: ${Colors.ENERGY};`}
//     ${props => props.success && css`fill: ${Colors.AUTHENTIC};`}
//     ${props => props.warning && css`fill: ${Colors.CREATIVE};`}
//     /* fill: ${Colors.ENERGY}; */
//   }
// `;

const renderSign = (props) => {
  const {warning, success, error, message} = props;
  
  let sign = (warning && warningIcon) || (success && successIcon) || (error && errorIcon);
  let color = (warning && Colors.CREATIVE) || (success && Colors.AUTHENTIC) || (error && Colors.ENERGY);

  const StyledAlertSign = styled(sign) `
    height: 16px;
    width: 16px;
    margin-right: 8px;

    path:first-of-type {
      ${css`fill: ${color};`}
    }
  `;
  const StyledAlertText = styled.span`
    color: ${color};
  `;
  
  return [
    <StyledAlertSign key='AlertSign'/>,
    <StyledAlertText key='AlertText'>{message}</StyledAlertText>
  ];
}

const FlexColumn__ErrorMessage = styled.div`
  align-items: center;
  
  display: flex;
  
  /* padding: 8px; */
  font-size: 16px;

  /* margin-top: 36px; */
  position: absolute;

  ${props => (props.alignedLeft && css`
    margin-top: 0px;
    position: relative;
  `)}
`;

const ErrorMessage = (props) => {
  const { message, alignedLeft } = props;
  if (message) {
    return (
      <FlexColumn__ErrorMessage alignedLeft={alignedLeft} {...props}>
        {renderSign(props)}
      </FlexColumn__ErrorMessage>
    );
  }

  return null;
  };

export default ErrorMessage;
