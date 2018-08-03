import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import Label from '../Label/Label';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Colors from '../../colors';

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
  grid-column-gap: 8px;
`;

const SelectionButton = styled.input.attrs({
  type: 'checkbox'
})`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  cursor: pointer;

  border: 1px solid ${Colors.MEDIUM_GRAY};
  border-color: ${Colors.MEDIUM_GRAY};
`;

const Group__CheckboxButton = SelectionButton.extend`
  display: none;
`;

const CheckBoxGroup__Label = styled.label`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-size: 14px;

  cursor: pointer;

  border: 1px solid ${Colors.MEDIUM_GRAY};
  border-color: ${Colors.MEDIUM_GRAY};

  border-radius: 3px;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      border-color: ${Colors.WARM_LIGHT};
      color: ${Colors.WARM_LIGHT};
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
      background-color: ${Colors.WARM_LIGHT};
      color: ${Colors.WHITE};
      border-color: ${Colors.WARM_LIGHT};
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
      labelWidth,
      description,
      disabled,
      className,
      checkboxWidth,
      error,
      errorStyle,
      checkboxClassName,
      checkboxStyle
    } = this.props.propValues || this.props;

    return (
      <MainCheckBoxGroup className={className}>
        <Label label={label} labelWidth={labelWidth} description={description} disabled={disabled} />
        <FlexColumnRelative>
          <Group width={checkboxWidth || '100px'}>
            {options.map((item, idx) => {
              const [
                selectionColor,
                checked,
                value
              ] = [
                this.props.selectionColor || `${Colors.AUTHENTIC}`,
                this.state.list.includes(item.key),
                item.key
              ];

              return (
                <CheckBoxGroup__Label
                  key={idx}
                  className={checkboxClassName}
                  disabled={disabled}
                  selectionColor={selectionColor}
                  style={checkboxStyle}
                  checked={checked}
                  value={value}
                >
                  <Group__CheckboxButton
                    id={`${propName}+${idx}`}
                    disabled={disabled}
                    defaultChecked={checked}
                    value={value}
                    onClick={(e) => {
                      let value = this.addOrRemove(item.key);
                      onChange(e, value, propName)
                    }}
                  />
                  {item.text}
                </CheckBoxGroup__Label>
              );
            })}
          </Group>

          <ErrorMessage error={error} errorStyle={errorStyle}/>
        </FlexColumnRelative>
      </MainCheckBoxGroup>
    );
  }
}

export default CheckBoxGroup;
