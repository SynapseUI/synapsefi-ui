import React from 'react';
import styled, { css } from 'styled-components';
import Colors from '../../colors';

export const LabelDescription = styled.div`
  display: flex;
  flex-direction: column;
  
  width: ${props => (props.labelWidth ? props.labelWidth : '25%')};

  margin-top: ${props => (props.textarea ? '8px' : '0')};
`;

export const LabelDescription__Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.DARK_NIGHT};
  line-height: normal;

  display: flex;
  align-self: left;

  ${(props) => props.onlyLabel && 'padding-top: 8px'};
  ${(props) => props.disabled && `color: ${Colors.WARM_LIGHT}`};
`;

export const LabelDescription__Description = styled.div`
  color: ${Colors.EVENING};
  text-align: left;
  font-size: 13px;
  white-space: pre-wrap;
  line-height: normal;

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
  label, description, labelWidth, largeInput, checkForPadding, disabled
}) => {  
  return (
    <LabelDescription labelWidth={labelWidth} className="label-description" largeInput={largeInput}>
      { renderLabel(label, description, checkForPadding, disabled) }

      {description &&
        <LabelDescription__Description>{description}</LabelDescription__Description>}
    </LabelDescription>
  );
};

export default Label;
