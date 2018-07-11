import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import Colors from '../../colors';

import Label from '../Label/Label';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { baseInputStyling } from '../styles/Input.styles'

export const MainTextarea = styled.div`
  display: flex;
  align-items: flex-start;
`;

const FlexColumn = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
`;

const FlexRowRev = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
`;

const FlexRowRev__Divider = styled.div`
  border-right: thin solid ${Colors.MEDIUM_GRAY};
  height: inherit;
  transition: box-shadow 0.5s;

  ${props =>
    props.error &&
    css`
      border-color: ${Colors.ENERGY} !important;
      box-shadow: 0 0px 3px 0 ${Colors.ENERGY} !important;
    `};
`;

const FlexRowRev__Textarea = styled.textarea`
  ${baseInputStyling}

  padding-top: calc(8px - (16px * 1.4 - 16px)/2);
  margin: 0px;
  min-height: 80px;
  border-width: 0px;
  color: ${Colors.DARK_NIGHT};
  width: 100%;
  &:focus {
    outline-color: none;
    box-shadow: 0px 0px 0px 0px transparent;
    border-width: 0px;
    background-color: transparent;
  }
  &:focus ~ ${FlexRowRev__Divider} {
    border-color: ${Colors.TEAL};
    box-shadow: 0 0px 3px 0 ${Colors.TEAL};
  }
`;

const FlexColumn__ErrorMessage = styled.span`
  color: #cf5938;
  padding: 8px;

  margin-top: 32px;

  position: absolute;
`;

export default class Textarea extends Component {
  constructor(props) {
    super(props);
  }

  /*
    Prop values

    Required:
      value - textarea value, format text

      cb - action that performs when textarea value changes, usually
        used to update the outer component's state
        
      field - used with the callback, identifies what part of the state is updating

    Optional:
      label - Label component will be called on the left if label exist

      description - goes with the Label component

      className - applies in the main wrapper MainCheckBoxGroup, usually
        used to identify the length and spacing of this component. i.e.
        className="user-page-input-row"
    
      styles - inline styling, i.e. {{ width: 80%, marginRight: 1rem }}

      autofocus - {true/false} - will auto focus on the textarea on mount

      error - will appear under the textarea if the value is invalid

      placeholder - placeholder for textarea

  */

 renderTextareaField() {
  const {
    autofocus,
    gatherValue,
    onChange,
    error,
    errorStyle,
    field,
    propName,
    placeholder,
    value,
  } = this.props.propValues || this.props;

  const { className, ...remainingProps } = this.props;

  return (
    <FlexColumn>

      <FlexRowRev>
        <FlexRowRev__Textarea
          {...remainingProps}
          id={propName}
          autoFocus={autofocus}
          value={value}
          type="text"
          onChange={(e) => onChange(e, e.target.value, propName)}
          placeholder={placeholder}
        />
        <FlexRowRev__Divider error={error}/>
      </FlexRowRev>

      <ErrorMessage error={error} errorStyle={errorStyle}/>
    </FlexColumn>
  );
}

  render() {
    const {
      className,
      description,
      label,
      labelWidth,
      style
    } = this.props.propValues || this.props;

    return (
      <MainTextarea className={className} style={style}>
        <Label
          largeInput={true}
          label={label}
          labelWidth={labelWidth}
          description={description}
          checkForPadding={true}
        />
        {this.renderTextareaField()}
      </MainTextarea>
    );
  }
}
