import React from 'react';
import styled, { css } from 'styled-components';

import {
  error as errorIcon,
  check as successIcon,
  warning as warningIcon,
  close as closeIcon,
} from '../SvgIcons';
import Colors from '../../colors';

// -------------------------------------------------------------------------------------
// -------------------------------- Styled Components-----------------------------------
// -------------------------------------------------------------------------------------

const FlexColumn__ErrorMessage = styled.div`
  ${props =>
    props.pageLevel &&
    css`
      width: 100%;
    `};
  align-items: center;
  display: flex;
  font-size: 16px;
  position: absolute;
  box-sizing: border-box;

  ${props =>
    props.alignedLeft &&
    css`
      margin-top: 0px;
      position: relative;
    `};
`;
// -------------------------------------------------------------------------------------
// ------------------------------ SubRender Methods ------------------------------------
// -------------------------------------------------------------------------------------

const renderTextOnlyAlert = props => {
  const { warning, success, error, message, pageLevel } = props;

  let sign = errorIcon;
  let textColor = Colors.ENERGY;
  let backgroundColor = Colors.LIGHT_ENERGY;

  if (error) {
    sign = errorIcon;
    textColor = Colors.ENERGY;
    backgroundColor = Colors.LIGHT_ENERGY;
  } else if (success) {
    sign = successIcon;
    textColor = Colors.AUTHENTIC;
    backgroundColor = Colors.LIGHT_AUTHENTIC;
  } else if (warning) {
    sign = warningIcon;
    textColor = Colors.CREATIVE;
    backgroundColor = Colors.LIGHT_CREATIVE;
  }

  const StyledAlertSign = styled(sign)`
    height: 20px;
    width: 20px;
    margin-right: 8px;

    path:first-of-type {
      ${css`
        fill: ${textColor};
      `};
    }
  `;
  const Background = styled.div`
    box-sizing: border-box;
    display: flex;
    height: 48px;
    width: 100%;
    padding: 14px 16px;
    background-color: ${pageLevel ? backgroundColor : 'transparent'};
    align-items: center;
  `;

  const StyledAlertText = styled.div`
    color: ${pageLevel && warning ? Colors.DARK_NIGHT : textColor};
  `;

  const CloseIcon = styled(closeIcon)`
    height: 12px;
    width: 12px;
    margin-left: 8px;
    cursor: pointer;
    display: ${pageLevel ? '' : 'none'};
    margin-left: auto;
    padding-left: 16px;

    path:first-of-type {
      ${css`
        fill: ${Colors.MEDIUM_GRAY};
      `};
    }
  `;

  return (
    <Background>
      <StyledAlertSign key="AlertSign" />
      <StyledAlertText key="AlertText">{message}</StyledAlertText>
      <CloseIcon onClick={props.onClose} />
    </Background>
  );
};

const ErrorMessage = props => {
  const { message, alignedLeft, hide, pageLevel } = props;
  if (hide === false) {
    return (
      <FlexColumn__ErrorMessage alignedLeft={alignedLeft} {...props}>
        {renderTextOnlyAlert(props)}
      </FlexColumn__ErrorMessage>
    );
  }

  return null;
};

export default ErrorMessage;
