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
  ErrorMessage,
  NumberInput
} from '../../index';

import * as Util from './util/form.util';

import DefaultStyledForm from './util/DefaultStyledForm';
import AdditionalButtons from './util/AdditionalButtons';

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
      errors: this.props.errors || {},
      afterSubmission: this.props.displayErrorsInstantly ? true : false,
      touch: this.props.displayErrorsInstantly ?
        new Set(Object.keys(this.props.formValues)) : new Set()
    };

    this.renderEntireForm = this.renderEntireForm.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTouchUpdate = this.handleTouchUpdate.bind(this);
    this.getCloneOfChild = this.getCloneOfChild.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.validation && this.state.afterSubmission) {
      const newErrors = Util.getErrorsCollection(nextProps.validation(), nextProps.formValues) || {};
      this.setState({ errors: newErrors });
    } else if (nextProps.errors){
      this.setState({ errors: nextProps.errors, afterSubmission: true });
    }
  }

  handleFormSubmit(e) {
    if (e) e.preventDefault();
    const baseErrors = this.props.errors || {};

    const validationResult = this.props.validation ? this.props.validation() : baseErrors;
    const errors = Util.getErrorsCollection(validationResult, this.props.formValues);

    if (_.isEmpty(errors)){
      return this.props.handleSubmit(e);
    }
      
    this.setState({
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
      if (typeof this.props.formValues[item.propName] === 'undefined'
          && !item.isChild) return null;
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

        error: Util.getPropNameErrors(this.state, item.propName),
        
        disabled: isDisabled,

        autoFocus: !this.state.touch.has(item.propName) && item.autoFocus
      };
      
      switch (item.formType) {
        case FormTypeConstants.TYPE_INPUT:
          return <Input key={idx} propValues={propValues} />;

        case FormTypeConstants.TYPE_NUMBERINPUT:
          return <NumberInput key={idx} propValues={propValues} />;

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
    if (_.isEmpty(item) || Util.isDOMTypeElement(child)) return child;
    const propName = item.propName || child.props.propName;

    return React.cloneElement(child, {
      item: item,
      error: Util.getPropNameErrors(this.state, propName),

      onFocus: (e) => {
        if (child.props.onFocus) child.props.onFocus(e);
        this.handleTouchUpdate(propName);
      }
    });
  }

  renderFooter() {
    const {
      additionalButtons,
      customFooter,
      isLoading
    } = this.props;

    const displayError = !_.isEmpty(this.state.errors) && this.state.afterSubmission;

    if (customFooter) {
      return Util.isDOMTypeElement(customFooter) ?
      customFooter :
      React.cloneElement(customFooter, {
        handleSubmit: this.handleFormSubmit,
        error: displayError && 'Missing required fields',
        isLoading
      });
    }

    const submitText = this.props.submitButtonText || 'Submit';

    return (
      <FlexEnd>
        { displayError &&
          <ErrorMessage
            error="Missing required fields"
            errorStyle={{ marginTop: '-35px', padding: '4px 0'}}
          />
        }
        <AdditionalButtons buttonData={additionalButtons} />
        <Button type="submit" medium isLoading={isLoading}>{submitText}</Button>
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
