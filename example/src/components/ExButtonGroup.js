import React from 'react';
import styled from 'styled-components';
import { ButtonGroup } from 'package';

const Wrapper = styled.div`
  padding: 300px;
  & > * {
    margin-bottom: 50px;
  }
`;

const btnObjs1 = [
  {
    text: 'yeah',
    onClick: () => {
      window.alert('yeah~~');
    },
  },
  {
    text: 'why',
    style: 'tertiary',
    size: 'large',
  },
];

const btnObjs2 = [
  {
    text: 'btn1',
  },
  {
    text: 'btn2',
    style: 'tertiary',
  },
  {
    text: 'btn3',
    style: 'remove',
  },
];

const ExButtonGroup = () => {
  return (
    <Wrapper>
      <ButtonGroup btnObjs={btnObjs1} fullWidthBtn />
      <ButtonGroup btnObjs={btnObjs2} />
    </Wrapper>
  );
};

export default ExButtonGroup;
