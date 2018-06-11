import React from 'react';
import styled from 'styled-components';
import { AnchorButton } from 'package';

const Wrapper = styled.div`padding: 300px;`;

const ExAnchorButtons = () => {
  return (
    <Wrapper>
      <AnchorButton text="basic" />
      <AnchorButton text="different size" fontSize="30px" />
      <AnchorButton text="hover red" hoverColor="red" />
      <AnchorButton text="actice green" activeColor="green" />
    </Wrapper>
  );
};

export default ExAnchorButtons;
