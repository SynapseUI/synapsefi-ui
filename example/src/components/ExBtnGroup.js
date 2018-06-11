import { ButtonGroup } from 'package';

import React from 'react';

const btnObjs = [
  {
    text: 'yeah',
  },
  {
    text: 'why',
    style: 'tertiary',
    size: 'large'
  },
];

const ExButtonGroup = () => {
  return (
    <div>
      <ButtonGroup btnObjs={btnObjs} fullWidthBtn />
    </div>
  );
};

export default ExButtonGroup;
