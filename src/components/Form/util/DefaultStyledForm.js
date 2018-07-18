import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import Colors from '../../../colors';

const defaultFormCSS = `
  box-sizing: border-box;
  font-family: Roboto;

  & > * {
    padding: 32px 0px;

    &:last-child {
      padding-bottom: 0px;
      border-bottom: none;
    }
  }
`;

const DefaultStyledForm = styled.form`
  ${defaultFormCSS}
`;

export default DefaultStyledForm;