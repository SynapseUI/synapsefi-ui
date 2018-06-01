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
  const { warning, success, error, message } = props;

  let sign = warningIcon;
  let color = Colors.ENERGY;

  if (error) {
    sign = warningIcon;
    color = Colors.ENERGY;
  } else if (success) {
    sign = successIcon;
    color = Colors.AUTHENTIC;
  } else if (warning) {
    sign = warningIcon;
    color = Colors.CREATIVE;
  }

  const StyledAlertSign = styled(sign)`
    height: 20px;
    width: 20px;
    margin-right: 8px;

    path:first-of-type {
      ${css`
        fill: ${color};
      `};
    }
  `;
  const Background = styled.div`
    box-sizing: border-box;
    display: flex;
    height: 48px;
    width: fit-content;
    padding: 14px 16px;
    background-color: pink;
    align-items: center;
  `;

  const StyledAlertText = styled.div`
    color: ${color};
  `;

  const CloseIcon = styled(closeIcon)`
    height: 12px;
    width: 12px;
    margin-left: 8px;
    cursor: pointer;

    path:first-of-type {
      ${css`
        fill: ${Colors.MEDIUM_GRAY};
      `};
    }
  `;

  // return [
  //   <StyledAlertSign key="AlertSign" />,
  //   <StyledAlertText key="AlertText">{message}</StyledAlertText>,
  // ];

  return (
    <Background>
      <StyledAlertSign key="AlertSign" />
      <StyledAlertText key="AlertText">{message}</StyledAlertText>
      <CloseIcon onClose={props.onClose} />
    </Background>
  );
};

const FlexColumn__ErrorMessage = styled.div`
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
