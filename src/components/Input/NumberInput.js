import React from 'react';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import Colors from '../../colors';
import Input from './Input';

import { getFormat } from './util/number.util';

const NumberInput = (props) => {
  const {
    autofocus,
    value,
    onChange,
    propName,
    placeholder,
    disabled,
    error,
    currency,
    label,
    type,
    format
  } = props.propValues || props;

  const formatSettings = getFormat(type, format);  

  return (
      <NumberFormat
        {...formatSettings}
        customInput={Input}
        label={label}
        autoFocus={autofocus}
        placeholder={placeholder || formatSettings.placeholder}
        disabled={disabled}
        error={error}
        value={value}
        onValueChange={(values, e) => onChange(e, values.value, propName)}
      />
  );
};

export default NumberInput;
