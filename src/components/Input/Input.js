import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import Label from '../Label/Label';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { baseInputStyling } from '../styles/Input.styles';
import Colors from '../../colors';
// import { NumberInput } from './NumberInput';

export const MainInput = styled.div`
  display: flex;
  align-items: center;
`;

const FlexRowRev__Divider = styled.div.attrs(
  { className: 'input-divider' }
)`
  border-right: thin solid ${Colors.MEDIUM_GRAY};
  height: 40px;
  transition: box-shadow 0.5s;

  ${props =>
    props.error &&
    css`
      border-color: ${Colors.ENERGY} !important;
      box-shadow: 0 0px 3px 0 ${Colors.ENERGY} !important;
    `};
`;

const AlignedSpan = styled.span`
  display: flex;
  align-self: center;

  ${props => props.disabled && css`color: ${Colors.WARM_LIGHT};`};
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
  align-items: center;
`;

const FlexRowRev__Input = styled.input`
  ${baseInputStyling}

  margin: 0px;
  height: 40px;
  font-size: 16px;
  border-width: 0px;
  color: ${Colors.DARK_NIGHT};

  &:disabled {
    color: ${Colors.WARM_LIGHT};
    cursor: not-allowed;

    & ~ ${FlexRowRev__Divider} {
      border-color: ${Colors.WARM_LIGHT};
    }
  }

  &:focus ~ ${FlexRowRev__Divider} {
    border-color: ${Colors.TEAL};
    box-shadow: 0 0px 3px 0 ${Colors.TEAL};
  }
`;

const symbols = {
  percentage: '%',
  cent: '¢',
};

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.renderSymbol = this.renderSymbol.bind(this);

    this.renderInputField = this.renderInputField.bind(this);

    this.renderBaseInput = this.renderBaseInput.bind(this);
    // this.renderNumberInput = this.renderNumberInput.bind(this);
  }

  /*
    Prop values

    Required:
      value - input value, format text

      onChange - action that performs when input value changes, usually
        used to update the outer component's state

      field - used with the callback, identifies what part of the state is updating

    Optional:
      label - Label component will be called on the left if label exist

      description - goes with the Label component

      className - applies in the main wrapper MainCheckBoxGroup, usually
        used to identify the length and spacing of this component. i.e.
        className="user-page-input-row"

      currency - true/false - will call a number formater input component for
        $ prefixing, comma seperations and decimal limit.

      styles - inline styling, i.e. {{ width: 80%, marginRight: 1rem }}

      autofocus - {true/false} - will auto focus on the input on mount

      error - will appear under the input if the value is invalid

      placeholder - placeholder for input

      type - will place a symbol at the end of the input based on the type.
        i.e. 'percentage -> %'

      inputType - defines what type the input will be i.e. 'text', 'date', 'number'

      disabled - will set the input as disabled

      errorCB - error check call back that will update "error" to true
        and change the coloring of Divider.
  */

  renderSymbol(type, disabled) {
    if (type) return <AlignedSpan disabled={disabled}>{symbols[type]}</AlignedSpan>;

    return null;
  }

  renderBaseInput() {
    const {
      autoFocus,
      onChange,
      onFocus,
      propName,
      placeholder,
      value,
      disabled,
    } = this.props.propValues || this.props;   
    
    const { className, ...remainingProps } = this.props;
    
    return (
      <FlexRowRev__Input
        {...remainingProps}
        id={propName}
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e, e.target.value, propName)}
        onFocus={onFocus}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  }

  // renderNumberInput() {
  //   const {
  //     autoFocus,
  //     onChange,
  //     onFocus,
  //     propName,
  //     placeholder,
  //     value,
  //     disabled,
  //     currency
  //   } = this.props.propValues || this.props;

  //   return (
  //     <NumberInput
  //       autoFocus={autoFocus}
  //       value={value}
  //       field={propName}
  //       onChange={onChange}
  //       onFocus={onFocus}
  //       placeholder={placeholder}
  //       disabled={disabled}
  //       currency={currency}
  //     />
  //   );
  // }

  renderInputField() {
    const {
      error,
      errorStyle,
      type,
      inputType,
      currency,
      disabled,
    } = this.props.propValues || this.props;
    // const mainInput = inputType === 'number' ?
    //   this.renderNumberInput() : this.renderBaseInput();
    const mainInput = this.renderBaseInput();

    return (
      <FlexColumn>
        <FlexRowRev>
          {this.renderSymbol(type, disabled)}
          {mainInput}
          <FlexRowRev__Divider error={error} />
        </FlexRowRev>

        <ErrorMessage error={error} errorStyle={errorStyle}/>
      </FlexColumn>
    );
  }

  render() {
    const {
      className, description, label, labelWidth, style, disabled
    } = this.props.propValues || this.props;    

    return (
      <MainInput className={className} style={style}>
        <Label
          label={label}
          labelWidth={labelWidth}
          description={description}
          disabled={disabled}
        />
        {/* {this.renderLabel(label, description, labelWidth, disabled)} */}
        {this.renderInputField()}
      </MainInput>
    );
  }
}
