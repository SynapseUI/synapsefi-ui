import React from 'react';
import { Button } from '../../../index';

const AdditionalButtons = ({buttonData}) => {
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

export default AdditionalButtons;