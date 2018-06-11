import styled from 'styled-components';
import colors from '../colors';
import * as SvgIcons from './SvgIcons';
import React from 'react';

const StyledSvgIcons = styled(SvgIcons.close)`
  cursor: pointer;
  fill: ${colors.MEDIUM_GRAY};
  &:hover {
    fill: ${colors.EVENING};
  }
  &:active {
    fill: ${colors.DARK_NIGHT};
  }
`;

const CloseButton = props => {
  return <StyledSvgIcons {...props} />;
};

export default CloseButton;
