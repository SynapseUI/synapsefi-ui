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
      <AnchorButton text="active yellow" activeColor="yellow" />
      <AnchorButton text="remove" fontSize="30px" remove />
      <AnchorButton text="tertiary" fontSize="30px" tertiary />
    </Wrapper>
  );
};

export default ExAnchorButtons;
