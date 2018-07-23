import React from 'react';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import Colors from '../../colors';
import Input from './Input';

import { getFormat } from './util/number.util';

const NumberInput = (props) => {
  const {
    type,
    onChange,
    format,
    placeholder,
    ...inputProps
  } = props.propValues || props;

  const formatSettings = getFormat(type, format);  

  return (
      <NumberFormat
        {...formatSettings}
        {...inputProps}
        customInput={Input}
        placeholder={placeholder || formatSettings.placeholder}
        onValueChange={(values, e) => onChange(e, values.value, propName)}
      />
  );
};

export default NumberInput;
