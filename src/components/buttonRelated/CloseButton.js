import React from 'react';
import styled from 'styled-components';

import * as SvgIcons from '../SvgIcons';
import colors from '../../colors';

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
