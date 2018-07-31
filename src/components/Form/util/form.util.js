import React from 'react';

export const isDOMTypeElement = (element) => {
  return React.isValidElement(element) && typeof element.type === 'string';
};