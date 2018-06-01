import React from 'react';
import styled, { css } from 'styled-components';

import {
  error as errorIcon,
  check as successIcon,
  warning as warningIcon,
  close as closeIcon,
} from '../SvgIcons';
import Colors from '../../colors';

// -----------------------------------------------------------------------------------------
// ---------------------------------------- Common Style -----------------------------------
// -----------------------------------------------------------------------------------------

const renderTextOnlyAlert = props => {
  const { warning, success, error, message, pageLevel } = props;

  let sign = errorIcon;
  let textColor = Colors.ENERGY;
  let backgroundColor = Colors.LIGHT_ENERGY;

  if (error) {
    sign = warningIcon;
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
    background-color: ${pageLevel? backgroundColor : 'transparent'};
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

const FlexColumn__ErrorMessage = styled.div`
  width: 100%;
  align-items: center;

  display: flex;

  /* padding: 8px; */
  font-size: 16px;

  /* margin-top: 36px; */
  position: absolute;

  ${props =>
    props.alignedLeft &&
    css`
      margin-top: 0px;
      position: relative;
    `};
`;

const ErrorMessage = props => {
  const { message, alignedLeft, show } = props;
  if (show) {
    return (
      <FlexColumn__ErrorMessage alignedLeft={alignedLeft} {...props}>
        {renderTextOnlyAlert(props)}
      </FlexColumn__ErrorMessage>
    );
  }

  return null;
};

export default ErrorMessage;
