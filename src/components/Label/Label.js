import React from 'react';
import styled, { css } from 'styled-components';

export const LabelDescription = styled.div`
  display: flex;
  flex-direction: column;
  width: 32rem;

  margin-top: ${props => (props.textarea ? '0.5rem' : '0')};
`;

export const LabelDescription__Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-dark-night);

  display: flex;
  align-self: left;

  ${(props) => props.onlyLabel && 'padding-top: 0.5rem'};
  ${(props) => props.disabled && 'color: var(--color-warm-light)'};
`;

export const LabelDescription__Description = styled.div`
  color: var(--color-evening);
  text-align: left;
  font-size: 13px;
  white-space: pre-wrap;

  margin-top: 5px;
  width: 75%;
`;

const renderLabel = (label, description, checkForPadding, disabled) => {
  if (checkForPadding && label) {
    return (
      <LabelDescription__Label
        disabled={disabled}
        onlyLabel={!description}
      >{label}
      </LabelDescription__Label>
    );
  }
  return (
    <LabelDescription__Label
      disabled={disabled}
    >{label}
    </LabelDescription__Label>
  );
};

/*
  Prop Values

  Required:
    ... none actually

  Optional:
    label - bolded label

    description - description under the label

    largeInput -  checks if label and description need to be aligned
      at the top

    checkForPadding - checks if label and description needs padding at the top

    disabled - will grey out label if true
*/

const Label = ({
  label, description, largeInput, checkForPadding, disabled
}) => {
  return (
    <LabelDescription className="label-description" largeInput={largeInput}>
      { renderLabel(label, description, checkForPadding, disabled) }

      {description &&
        <LabelDescription__Description>{description}</LabelDescription__Description>}
    </LabelDescription>
  );
};

export default Label;
