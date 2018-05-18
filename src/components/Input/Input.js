import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import { 
  baseStyling
} from '../styles/Input.styles';

import Label from '../Label/Label';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
// import { NumberInput } from './NumberInput';

export const MainInput = styled.div`
  display: flex;
  align-items: center;
`;

const FlexRowRev__Divider = styled.div.attrs(
  { className: 'input-divider' }
)`
  border-right: thin solid var(--color-medium-gray);
  height: 40px;
  transition: box-shadow 0.5s;

  ${props =>
    props.error &&
    css`
      border-color: var(--color-energy) !important;
      box-shadow: 0 0px 3px 0 var(--color-energy) !important;
    `};
`;

const AlignedSpan = styled.span`
  display: flex;
  align-self: center;

  ${props => props.disabled && css`color: var(--color-warm-light);`};
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
  ${baseStyling}

  margin: 0px;
  height: 40px;
  font-size: 1rem;
  border-width: 0px;
  color: var(--color-dark-base);

  &:disabled {
    color: var(--color-warm-light);
    cursor: not-allowed;

    & ~ ${FlexRowRev__Divider} {
      border-color: var(--color-warm-light);
    }
  }

  &:focus ~ ${FlexRowRev__Divider} {
    border-color: var(--color-teal);
    box-shadow: 0 0px 3px 0 var(--color-teal);
  }
`;

const symbols = {
  percentage: '%',
  cent: '¢',
};

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.renderLabel = this.renderLabel.bind(this);
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

      errorMessage - will appear under the input if the value is invalid

      placeholder - placeholder for input

      type - will place a symbol at the end of the input based on the type.
        i.e. 'percentage -> %'

      inputType - defines what type the input will be i.e. 'text', 'date', 'number'

      disabled - will set the input as disabled

      errorCB - error check call back that will update "error" to true
        and change the coloring of Divider.
  */

  renderLabel(label, description, disabled) {
    if (label) {
      return <Label label={label} description={description} disabled={disabled} />;
    }

    return null;
  }

  renderSymbol(type, disabled) {
    if (type) return <AlignedSpan disabled={disabled}>{symbols[type]}</AlignedSpan>;

    return null;
  }

  renderBaseInput() {
    const {
      autofocus,
      cb,
      onChange,
      propName,
      field,
      placeholder,
      value,
      inputType,
      disabled,
    } = this.props.propValues || this.props;

    return (
      <FlexRowRev__Input
        id={propName}
        autoFocus={autofocus}
        value={value}
        type={inputType || 'text'}
        onChange={(e) => onChange(e.target.value, propName)}
        // onBlur={this.props.onBlur}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  }

  // renderNumberInput() {
  //   const {
  //     autofocus,
  //     cb,
  //     updateField,
  //     propName,
  //     placeholder,
  //     value,
  //     disabled,
  //     currency
  //   } = this.props.propValues || this.props;

  //   return (
  //     <NumberInput
  //       autoFocus={autofocus}
  //       value={value}
  //       field={propName}
  //       cb={cb}
  //       updateField={updateField}
  //       placeholder={placeholder}
  //       disabled={disabled}
  //       currency={currency}
  //     />
  //   );
  // }

  renderInputField() {
    const {
      errorMessage,
      error,
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

        <ErrorMessage
          error={error}
          errorMessage={errorMessage}
        />
      </FlexColumn>
    );
  }

  render() {
    const {
      className, description, label, style, disabled
    } = this.props.propValues || this.props;

    return (
      <MainInput className={className} style={style}>
        {this.renderLabel(label, description, disabled)}
        {this.renderInputField()}
      </MainInput>
    );
  }
}
