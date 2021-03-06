import React from 'react';
import styled, { css } from 'styled-components';

import Colors from '../../colors';

import Label from '../Label/Label';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export const MainRadioGroup = styled.div`
  display: flex;
  align-items: center;
`;

const Group = styled.div`
  display: flex;
`;

const Group__RadioButton = styled.input.attrs({
  type: 'radio'
})`
  display: none;
`;

const RadioButton__Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  line-height: 8px;
  cursor: pointer;
  border: 1px solid ${Colors.MEDIUM_GRAY};
  border-color: ${Colors.MEDIUM_GRAY};
  box-sizing: border-box;
  padding: 16px;
  color: ${Colors.DARK_NIGHT};

  border-right-width: 0px;

  &:first-of-type {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  &:last-of-type {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;

    border-right-width: 1px;
  }

  ${({ disabled }) => disabled && css`
    cursor: not-allowed;
    border-color: ${Colors.WARM_LIGHT};
    color: ${Colors.WARM_LIGHT};
  `}

  ${({ checked }) => checked && css`
    border-color: ${Colors.AUTHENTIC};
    background-color: ${Colors.AUTHENTIC};
    color: ${Colors.WHITE};
  `}

  ${({ checked, disabled }) => checked && disabled && css`
    background-color: ${Colors.WARM_LIGHT};
    color: ${Colors.WHITE};
    border-color: ${Colors.WARM_LIGHT};
  `}

  ${({ largeButtons }) => largeButtons && 'overflow-wrap: break-word;'};

  ${({ rightOfSelected }) => rightOfSelected && css`
    border-left-color: ${Colors.AUTHENTIC};
  `}
`;

/* Prop Values

  Required:
    values - list of selected values, i.e. ['APPLE', 'PEAR']

    options - the list of items. Must be array of objects
      with key and text parameters i.e.
        [
          { key: 'APPLE', text: 'Apple },
          { key: 'DOG', text: 'Dog'}
        ]

    field - used with the callback, identifies what part of the state is updating

    cb - action that performs when a user clicks a checkbox, usually updates
      the state from where this component is being called.

    Optional:
      label - Label component will be called on the left if label exist

      description - goes with the Label component

      className - applies in the main wrapper MainCheckBoxGroup, usually
        used to identify the length and spacing of this component. i.e.
        className="user-page-input-row"

      checkboxWidth - defines the width of all the checkboxes, default 100px

      largeButtons - boolean value that will set overflow-wrap: break-word if true
*/

const RadioGroup = (props) => {
  const {
    value,
    propName,
    onChange,
    options,
    label,
    labelWidth,
    description,
    largeButtons,
    className,
    radioStyle,
    disabled,
    error,
    errorStyle
} = props.propValues || props;
  
  let selectedIndex;
  return (
    <MainRadioGroup className={className}>
      <Label label={label} labelWidth={labelWidth} description={description} disabled={disabled} />

      <Group>
        {options.map((item, idx) => {          
          if (item.key === value) selectedIndex = idx;
          return (
            <RadioButton__Label
              key={idx}
              rightOfSelected={idx === selectedIndex + 1}
              style={radioStyle}
              largeButtons={largeButtons}
              checked={item.key === value}
              disabled={disabled}
            >
              <Group__RadioButton
                id={`${propName}+${idx}`}
                defaultValue={item.key}
                disabled={disabled}
                checked={item.key === value}
                onChange={(e) => onChange(e, item.key, propName)}
              />
              {item.text}
            </RadioButton__Label>
          );
        })}
        <ErrorMessage error={error} errorStyle={errorStyle}/>
      </Group>

      
    </MainRadioGroup>
  );
};

export default RadioGroup;
