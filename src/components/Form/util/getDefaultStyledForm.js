import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import Colors from '../../../colors';

const defaultFormCSS = `
  box-sizing: border-box;
  font-family: Roboto;

  & > * {
    padding: 32px 16px;
    border-bottom: 1px solid ${Colors.SILK_WHITE};

    &:last-child {
      padding-bottom: 0px;
      border-bottom: none;
    }
  }
`;

export const DefaultStyleForm = styled.form`
  ${defaultFormCSS}
`;

export const getDefaultStyledForm = (formClassName) => {
  return styled.form.attrs({
    className: formClassName
  })`
    ${_.isEmpty(formClassName) ? `${defaultFormCSS}` : ''}
  `;
}

// export const DefaultStyleForm = (props) => {
//   return styled.form.attrs({
//     className: props.formClassName
//   })`
//     ${_.isEmpty(props.formClassName) ? `${defaultFormCSS}` : ''}
//   `;
// }