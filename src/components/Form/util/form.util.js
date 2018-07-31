import React from 'react';
import _ from 'lodash';

export const isDOMTypeElement = (element) => {
  return React.isValidElement(element) && typeof element.type === 'string';
};

export const getPropNameErrors = (state, propName) => {
  return (state.afterSubmission
    && state.touch.has(propName) ?
    state.errors[propName] : false);
};

export const getErrorsCollection = (errors, currentFormValues) => {
  return _.reduce(errors, (memo, errmessage, errKey) => {
    if (typeof currentFormValues[errKey] !== undefined) {
      memo[errKey] = errmessage
    }

    return memo;
  }, {});
}