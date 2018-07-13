import React, { Component } from 'react';
import _ from 'lodash';

import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  Button,
  Input,
  Textarea,
  CheckboxGroup,
  RadioGroup,
  Dropdown,
  FormTypeConstants,
  ErrorMessage
} from '../../index';

import DefaultStyledForm from './util/DefaultStyledForm';

const renderButtons = (buttonData) => {
  if (!buttonData) return null;

  return buttonData.map((button, idx) => {
    return (
      <Button
        key={idx}
        type="button"
        tertiary={button.style === 'tertiary'}
        secondary={button.style === 'secondary'}
        onClick={button.action || button.onClick}
      >
      {button.text}
    </Button>
    )
  });
}

const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: 16px;
  }
`;

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: this.props.validation ?
        this.getErrorsCollection(this.props.validation(), this.props.formValues)
        : {},
      afterSubmission: false,
      touch: new Set()
    };

    this.renderEntireForm = this.renderEntireForm.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTouchUpdate = this.handleTouchUpdate.bind(this);
    this.getErrorsCollection = this.getErrorsCollection.bind(this);
    this.getCloneOfChild = this.getCloneOfChild.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.validation && this.state.afterSubmission) {
      const newErrors = this.getErrorsCollection(nextProps.validation(), nextProps.formValues) || {};
      this.setState({ errors: newErrors });
    }
  }

  getErrorsCollection(errors, currentFormValues) {
    return _.reduce(errors, (memo, errmessage, errKey) => {
      if (typeof currentFormValues[errKey] !== undefined) {
        memo[errKey] = errmessage
      }

      return memo;
    }, {});
  }

  handleFormSubmit(e) {
    if (e) e.preventDefault();
    const validationResult = this.props.validation ? this.props.validation() : {};
    const errors = this.getErrorsCollection(validationResult, this.props.formValues);
    
    _.isEmpty(errors) ?
      this.props.handleSubmit(e)
      : this.setState({
        afterSubmission: true,
        touch: new Set(Object.keys(this.props.formValues)),
        errors
      });
  }

  handleTouchUpdate(propName) {
    if (!this.state.touch.has(propName)) {
      let newTouch = new Set(this.state.touch);
      newTouch.add(propName)
      this.setState({ touch: newTouch });
    }
  }

  renderEntireForm() {
    let formChildren = !!this.props.children ?
      React.Children.map(this.props.children, (child) => child) : [];

      const onChangeCollection = this.props.onChangeCollection || {};
    
    let result = this.props.data.map((item, idx) => {
      if (typeof this.props.formValues[item.propName] === 'undefined') return null;
      if (this.props.hiddenCollection && this.props.hiddenCollection[item.propName]) return null;

      let isDisabled = item.disabled;
      if (this.props.disabledCollection && this.props.disabledCollection[item.propName]){
        isDisabled = this.props.disabledCollection[item.propName];
      }

      const propValues = {
        ...item,
        value: this.props.formValues[item.propName],
        onChange: onChangeCollection[item.propName]
          || onChangeCollection[item.type]
          || onChangeCollection['default']
          || this.props.onChange,

        onBlur: () => {
          this.handleTouchUpdate(item.propName);
          if(item.onBlur) item.onBlur()
        },

        error: this.state.afterSubmission
          && this.state.touch.has(item.propName)
          && this.state.errors[item.propName],
        
        disabled: isDisabled,

        autoFocus: !this.state.touch.has(item.propName) && item.autoFocus
      };
      
      switch (item.formType) {
        case FormTypeConstants.TYPE_INPUT:
          return <Input key={idx} propValues={propValues} />;

        case FormTypeConstants.TYPE_TEXTAREA:
          return <Textarea key={idx} propValues={propValues} />;

        case FormTypeConstants.TYPE_RADIOGROUP:
          return <RadioGroup key={idx} propValues={propValues} />;

        case FormTypeConstants.TYPE_CHECKBOXGROUP:
          return <CheckboxGroup key={idx} propValues={propValues} />;

        case FormTypeConstants.TYPE_DROPDOWN:
          return <Dropdown key={idx} propValues={propValues} />;

        default:
          if (!_.isEmpty(formChildren)) {
            const child = formChildren.shift();
            return this.getCloneOfChild(child, item);
          } else {
            return null;
          }
      }
    });
    
    return result.concat(formChildren.map(this.getCloneOfChild));
  }

  getCloneOfChild(child, item){
    if (_.isEmpty(item)) return child;
    const propName = item.propName || child.props.propName;

    return React.cloneElement(child, {
      item,
      error: this.state.afterSubmission
        && this.state.touch.has(propName)
        && this.state.errors[propName],

      onFocus: (e) => {
        if (child.props.onFocus) child.props.onFocus(e);
        this.handleTouchUpdate(propName);
      }
    });
  }

  renderFooter() {
    const {
      handleSubmit,
      additionalButtons,
      formValues,
      customFooter,
      isLoading
    } = this.props;

    const displayError = !_.isEmpty(this.state.errors) && this.state.afterSubmission;

    if (customFooter) return React.cloneElement(customFooter, {
      handleSubmit: this.handleFormSubmit,
      error: displayError && 'Missing required fields',
      isLoading
    });

    const submitText = this.props.submitButtonText || 'Submit';

    return (
      <FlexEnd>
        { displayError &&
          <ErrorMessage
            error="Missing required fields"
            errorStyle={{ marginTop: '-32px'}}
          />
        }
        { renderButtons(additionalButtons) }
        <Button type="submit" isLoading={isLoading}>{submitText}</Button>
      </FlexEnd>
    )
  }

  render() {
    if(this.props.formClassName){
      return (
        <form
          className={this.props.formClassName}
          onSubmit={this.handleFormSubmit}>
          {this.renderEntireForm()}
          {this.renderFooter()}
        </form>
      );
    }

    return (
      <DefaultStyledForm
        onSubmit={this.handleFormSubmit}>
        {this.renderEntireForm()}
        {this.renderFooter()}
      </DefaultStyledForm>
    );
  }
}

Form.propTypes = {
  formValues: PropTypes.object,
  handleSubmit: PropTypes.func,
}

export default Form;
