import React from 'react';
import styled, { css, keyframes } from 'styled-components';

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

const buzz = keyframes`
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-2px, 0, 0);
    transform: translate3d(-2px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(2px, 0, 0);
    transform: translate3d(2px, 0, 0);
  }
`;

const slideInDown = keyframes`
  from {
    -webkit - transform: translatey(-100%);
    transform: translatey(-100%);
    /* visibility: visible; */
  }

  to {
    -webkit - transform: translatey(0);
    transform: translatey(0);
  }
`;

// -------------------------------------------------------------------------------------
// ------------------------------ SubRender Methods ------------------------------------
// -------------------------------------------------------------------------------------

const renderAlert = props => {
  const { warning, success, error, message, pageLevel } = props;

  // defaults to error styling
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

  const FlexColumn__AlertMessage = styled.div`
    height: 32px;
    display: flex;
    font-size: 16px;
    position: absolute;
    box-sizing: border-box;
    align-items: center;
    ${pageLevel &&
      css`
        width: 100%;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        padding: 14px 16px;
        height: 48px;
        animation: ${slideInDown} 0.2s linear;
        background-color: ${backgroundColor};
      `};
  `;

  const StyledAlertSign = styled(sign)`
    height: 20px;
    width: 20px;
    ${warning && 
      css`
        fill: ${textColor};
      `};
    margin-right: 8px;

    path:first-of-type {
      ${css`
        fill: ${textColor};
      `};
    }
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
    <FlexColumn__AlertMessage {...props}>
      <StyledAlertSign key="AlertSign" />
      <StyledAlertText key="AlertText">{message}</StyledAlertText>
      <CloseIcon onClick={props.onClose} />
    </FlexColumn__AlertMessage>
  );
};

const AlertMessage = props => {
  // ---------------------------------------------------------------------------------------
  // ---------------------------------- Render ---------------------------------------------
  // ---------------------------------------------------------------------------------------
  const { hide } = props;
  if (hide === false) {
    return renderAlert(props);
  }
  return null;
};

export default AlertMessage;