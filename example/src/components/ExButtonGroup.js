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
    fontSize: '50px',
  },
];

const ExButtonGroup = () => {
  return (
    <Wrapper>
      <ButtonGroup btnObjs={btnObjs1} fullWidthBtn />
      <ButtonGroup gap="400px" btnObjs={btnObjs2} />
      <ButtonGroup gap="400px" isAnchorButton btnObjs={btnObjs2} />
    </Wrapper>
  );
};

export default ExButtonGroup;
