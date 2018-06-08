import { BtnGroup } from 'package';

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

const ExBtnGroup = () => {
  return (
    <div>
      <BtnGroup btnObjs={btnObjs} fullWidthBtn />
    </div>
  );
};

export default ExBtnGroup;
