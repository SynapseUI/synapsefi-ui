import React, { Component } from 'react';
import _ from 'lodash';

import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  Button,
  Input,
  TextArea,
  CheckboxGroup,
  RadioGroup,
  Dropdown
} from '../../index';

const TYPE_INPUT = 'TYPE_INPUT';
const TYPE_TEXTAREA = 'TYPE_TEXTAREA';
const TYPE_RADIOGROUP = 'TYPE_RADIOGROUP';
const TYPE_CHECKBOXGROUP = 'TYPE_CHECKBOXGROUP';
const TYPE_DROPDOWN = 'TYPE_DROPDOWN';

const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
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
    const errors = this.getErrorsCollection(this.props.validation(), this.props.formValues);
    
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
    let formChildren = !!this.props.children ? [...this.props.children] : [];
    const onChangeCollection = this.props.onChangeCollection || {};

    let result = this.props.data.map((item, idx) => {
      if (typeof this.props.formValues[item.propName] === 'undefined') {
        return null;
      }

      const propValues = {
        ...item,
        className: item.className || this.props.rowClassName,
        value: this.props.formValues[item.propName],
        onChange: onChangeCollection[item.propName]
          || onChangeCollection[item.type]
          || onChangeCollection['default']
          || this.props.onChange,

        onFocus: () => this.handleTouchUpdate(item.propName),

        disabled: item.disabled,
        options: item.options,
        error: this.state.afterSubmission
          && this.state.touch.has(item.propName)
          && this.state.errors[item.propName]
      };

      switch (item.formType) {
        case TYPE_INPUT:
          return <Input key={idx} propValues={propValues} />;

        case TYPE_TEXTAREA:
          return <TextArea key={idx} propValues={propValues} />;

        case TYPE_RADIOGROUP:
          return <RadioGroup key={idx} propValues={propValues} />;

        case TYPE_CHECKBOXGROUP:
          return <CheckboxGroup key={idx} propValues={propValues} />;

        case TYPE_DROPDOWN:
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
    const propName = item.propName || child.props.propName;

    return React.cloneElement(child, {
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
      checkIfErrors,
      formValues,
      withInModal,
      customFooter
    } = this.props;

    if (customFooter) return React.cloneElement(customFooter, {
      handleSubmit: this.props.handleSubmit.bind(this),
      error: !_.isEmpty(this.props.errors),
      errorMessage: 'Missing required fields'
    });

    return (
      <FlexEnd>
        <Button type="submit">Submit</Button>
      </FlexEnd>
    )
  }

  render() {
    return (
      <form
        className={this.props.formClassName}
        onSubmit={this.handleFormSubmit}>
        {this.renderEntireForm()}
        {this.renderFooter()}
      </form>
    );
  }
}

Form.propTypes = {
  formValues: PropTypes.object,
  validation: PropTypes.func,
  handleSubmit: PropTypes.func,
  onChangeCollection: PropTypes.object
}

export default Form;
