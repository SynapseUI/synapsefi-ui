import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import Label from '../Label/Label';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export const MainCheckBoxGroup = styled.div`
  display: flex;
  align-items: center;
`;

const FlexColumnRelative = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
`;

const Group = styled.div`
  display: grid;
  grid-auto-columns: ${props => props.width && props.width};
  grid-auto-flow: column;
  grid-column-gap: 0.5rem;
`;

const SelectionButton = styled.input.attrs({
  type: 'checkbox'
})`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  cursor: pointer;

  border: 1px solid var(--color-medium-gray);
  border-color: var(--color-medium-gray);
`;

const Group__CheckboxButton = SelectionButton.extend`
  display: none;
`;

const CheckBoxGroup__Label = styled.label`

  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  cursor: pointer;

  border: 1px solid var(--color-medium-gray);
  border-color: var(--color-medium-gray);

  border-radius: 3px;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      border-color: var(--color-warm-light);
      color: var(--color-warm-light);
    `} ${({ checked, selectionColor }) =>
      checked &&
      `
    border-color: ${selectionColor};
    color: ${selectionColor};
    border-width: 2px;
  `};

  ${({ checked, disabled }) =>
    checked &&
    disabled &&
    css`
      background-color: var(--color-warm-light);
      color: var(--color-white);
      border-color: var(--color-warm-light);
    `};

`;

class CheckBoxGroup extends Component {
  constructor(props) {
    super(props);

    let value = this.props.propValues ?
      this.props.propValues.value
      : this.props.value;

    this.state = {
      list: value || [],
    };

    this.addOrRemove = this.addOrRemove.bind(this);
  }

  addOrRemove(key) {
    let newList = [...this.state.list];
    if (newList.includes(key)) {
      let idx = newList.indexOf(key);
      newList = newList.slice(0, idx).concat(newList.slice(idx + 1));
    } else {
      newList.push(key);
    }

    return newList;
  }

  componentWillReceiveProps(nextProps) {
    let nextValues = nextProps.propValues ?
      nextProps.propValues.value
      : nextProps.value;

    this.setState({ list: nextValues });
  }

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

        checkboxClassName - applies to each checkbox

        checkboxWidth - defines the width of all the checkboxes, default 100px
  */

  render() {
    const {
      options,
      propName,
      gatherValue,
      onChange,
      label,
      description,
      disabled,
      className,
      checkboxWidth,
      error,
      errorMessage,
      checkboxClassName,
    } = this.props.propValues || this.props;

    return (
      <MainCheckBoxGroup className={className}>
        <Label label={label} description={description} disabled={disabled} />
        <FlexColumnRelative>
          <Group width={checkboxWidth || '100px'}>
            {options.map((item, idx) => {
              const [
                selectionColor,
                checked,
                value
              ] = [
                this.props.selectionColor || 'var(--color-authentic)',
                this.state.list.includes(item.key),
                item.key
              ];

              return (
                <CheckBoxGroup__Label
                  key={idx}
                  className={checkboxClassName}
                  disabled={disabled}
                  selectionColor={selectionColor}
                  checked={checked}
                  value={value}
                >
                  <Group__CheckboxButton
                    id={propName}
                    disabled={disabled}
                    defaultChecked={checked}
                    value={value}
                    onClick={(e) => {
                      let value = gatherValue ? this.addOrRemove(e.target.value) :  e;
                      onChange(value, propName);
                    }}
                  />
                  {item.text}
                </CheckBoxGroup__Label>
              );
            })}
          </Group>

          <ErrorMessage error={error} errorMessage={errorMessage} showSymbol={true} />
        </FlexColumnRelative>
      </MainCheckBoxGroup>
    );
  }
}

export default CheckBoxGroup;
